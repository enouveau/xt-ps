import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as Terminal from "xterm";
// import { searchAddon } from '../xterm/lib/addons/search'
// import "xterm/dist/addons/fit/fit";

@Component({
  selector: 'app-ps-terminal',
  templateUrl: './ps-terminal.component.html',
  styleUrls: ['./ps-terminal.component.scss']
})
export class PsTerminalComponent implements OnInit {

  private terminal: Terminal;
  private container: any;
  private currentLine: string = '';
  private socketUrl: string = 'ws://localhost:6516/api/nodes/matwils-sbtake1/features/powershellconsole';
  private socket: WebSocket = null;

  constructor() {
    // Terminal.loadAddon('fit');
    // Terminal.loadAddon('attach');
  }

  ngOnInit() {

    // Create socket client
    this.socket = new WebSocket(this.socketUrl);

    // Create a terminal
    this.terminal = new Terminal({
      cursorBlink: false,
      cols: 80,
      rows: 32,
      scrollback: 200,
    });

    this.container = document.getElementById('terminal-container');

    // second parameter is focus
    this.terminal.open(this.container, true);
    // console.log("pid: " + this.terminal.pid);
    // this.terminal.fit();

    // this.terminal.winptyCompatInit();
    if (this.socket != null) {
      this.socket.onopen = function (ev) {
        this.terminal.writeln('PowerShell connected...');

        // Attach the socket to the terminal
        // see xtermjs.org > docs > attach addon for explanation on attach params
        // this.terminal.attach(this.socket, true, true);
        this.terminal._initialized = true;
        this.terminal.setOption('cursorBlink', true);

        this.terminal.prompt = function () {
          this.terminal.write('\r\n');
        }.bind(this);

        this.terminal.prompt();

        // Fires when user wrote something in the terminal
        this.terminal.on('data', function (data) {
          this.terminal.write(data);
        }.bind(this));

        // Send every keystroke to powershell
        this.terminal.on('key', function (key, ev) {
          this.socket.send(key);
        }.bind(this));

      }.bind(this);

      // Fires when we receive data from PowerShell
      this.socket.onmessage = function (ev) {
        this.terminal.write(ev.data);
        this.terminal.write('\r\n');
      }.bind(this);

      this.socket.onerror = function (ev) {
        this.terminal.writeln("Socket error..");
      }.bind(this);

      this.socket.onclose = function (ev) {
        this.terminal.writeln("Socket closed..");
      }.bind(this);
    }
    else {
      console.log("Socket open error..");
    }
  }

  ngOnDestroy() {
    this.socket.close();
    // this.terminal.detach(this.socket);
  }

  ngAfterViewInit() {
  }
}
