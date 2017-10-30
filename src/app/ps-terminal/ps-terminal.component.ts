import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Terminal from "xterm";
//import { searchAddon } from '../xterm/lib/addons/search'
//import "xterm/dist/addons/fit/fit";

@Component({
  selector: 'app-ps-terminal',
  templateUrl: './ps-terminal.component.html',
  styleUrls: ['./ps-terminal.component.scss']
})
export class PsTerminalComponent implements OnInit {

  private terminal: Terminal;
  private container: any;
  private currentLine: string = "";
  private socketUrl: string = "ws://localhost:1122/ps-socket";
  private socket: WebSocket = null;

  constructor() {
    // Terminal.loadAddon("fit");
    // Terminal.loadAddon('search');
    Terminal.loadAddon('attach');
  }

  ngOnInit() {

    // Create socket client
    // this.socket = new WebSocket(this.socketUrl);

    // Create a terminal
    this.terminal = new Terminal({
      cursorBlink: true,
      useStyle: true,
      cols: 120,
      rows: 30,
      scrollback: 60,
    });

    this.container = document.getElementById('terminal-container');
    this.terminal.open(this.container, true);

    // Attach the socket to the terminal
    // this.terminal.attach(this.socket, true, true);

    // User writeln to write something to the console
    this.terminal.writeln('SME PS Console');
    this.terminal.writeln('');

    /*
    if (this.socket != null) {
      this.socket.onopen = function (ev) {
        this.terminal.writeln("Web socket connected..");
      }.bind(this);

      this.socket.onerror = function (ev) {
        this.terminal.writeln("Socket error..");
      }.bind(this);

      this.socket.onclose = function (ev) {
        this.terminal.writeln("Socket closed..");
      }.bind(this);

      this.socket.onmessage = function (ev) {
        this.terminal.writeln(ev.data);
      }.bind(this);
    }
    else {
      console.log("Socket open error..");
    }
    */

    // Custom prompt
    this.prompt();

    // Subscribe to the key press event on the terminal
    // We receive user input here
    this.terminal.on('key', (key, ev) => {

      var printable = (
        !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
      );

      if (ev.keyCode == 13) {

        if (this.currentLine.toLowerCase() == "clear") {
          this.terminal.clear();
        }
        else if (this.currentLine.toLowerCase() == "date") {
          this.terminal.writeln('');
          this.terminal.writeln(new Date());
        }
        else {
          console.log("Sending Command : " + this.currentLine);
          // TODO: Send the data to websocket
          // this.socket.send(this.currentLine);
        }

        // reset the current line
        this.currentLine = "";

        // show the prompt
        this.prompt();

      }
      // backspace 
      else if (ev.keyCode == 8) {
        // Do not delete the prompt
        if (this.terminal.x > 2) {
          this.terminal.write('\b \b');
        }
      }
      // Otherwise we just write back to the console
      else if (printable) {
        this.currentLine = this.currentLine + key;
        this.terminal.write(key);
      }

    });

    this.terminal.on('paste', function (data, ev) {
      this.terminal.write(data);
    });

    this.terminal.textarea.onkeydown = function (e) {
      // console.log('User pressed key: ', e.keyCode);
    }
  }

  // Prompts a custom prefix
  prompt() {
    this.terminal.write('\r\n' + 'SME-PS > ');
  }

  ngAfterViewInit() {
  }

}
