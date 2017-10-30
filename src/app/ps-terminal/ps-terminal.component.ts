import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Terminal from "xterm";
//import { searchAddon } from '../xterm/lib/addons/search'
import "xterm/dist/addons/fit/fit";

@Component({
  selector: 'app-ps-terminal',
  templateUrl: './ps-terminal.component.html',
  styleUrls: ['./ps-terminal.component.scss']
})
export class PsTerminalComponent implements OnInit {

  public terminal: Terminal;
  public container: any;
  private currentLine: string = "";

  constructor() {
    Terminal.loadAddon("fit");
    Terminal.loadAddon('search');
  }

  ngOnInit() {
    this.terminal = new Terminal({
      cursorBlink: true,
      useStyle: true,
      cols: 120,
      rows: 30,
      scrollback: 60,
    });

    this.container = document.getElementById('terminal-container');
    this.terminal.open(this.container);
    
    // this.term.fit();

    this.terminal.writeln('Mock Console');
    this.terminal.writeln('');
    this.prompt();

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

        // reset the current line
        this.currentLine = "";

        // show the prompt
        this.prompt();

      } else if (ev.keyCode == 8) {
        // Do not delete the prompt
        if (this.terminal.x > 2) {
          this.terminal.write('\x08');
        }

        //this.currentLine = this.currentLine.substring(0, this.currentLine.length-1);
        //this.term.write(this.currentLine);

      } else if (printable) {
        this.currentLine = this.currentLine + key;
        this.terminal.write(key);
      }

    });

    this.terminal.on('paste', function (data, ev) {
      this.term.write(data);
    });

    this.terminal.textarea.onkeydown = function (e) {
      console.log('User pressed key with keyCode: ', e.keyCode);
    }
  }

  prompt() {
    this.terminal.write('\r\n' + 'SME-PS > ');
  }

  ngAfterViewInit() {
  }

}
