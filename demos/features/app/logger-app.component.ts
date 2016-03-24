import {Component} from 'angular2/core';
import {Logger, Level} from "angular2-logger/core";

@Component({
    selector: "logger-app",
    template: `

        <h1>Logger's current priority level: {{logger.level}} </h1> 

        <h3>Change the Logger's priority level</h3>
        
        <button (click)="setLevel( Level.OFF )"> Off </button>
        <button (click)="setLevel( Level.ERROR )"> Error </button>
        <button (click)="setLevel( Level.WARNING )"> Warning </button>
        <button (click)="setLevel( Level.INFO )"> Info </button>
        <button (click)="setLevel( Level.DEBUG )"> Debug </button>
        <button (click)="setLevel( Level.LOG )"> Log </button>
        
        <h3>Watch their effects in the console</h3>

        <button (click)="logMsgs()">Log Messages</button>
        <button (click)="clear()"> Clear console </button>
              
        <h3>Store the logger's current level in the browser's local storage so it doesn't get reset after refreshing the page. </h3>
        <button (click)="store()"> store </button>
        <button (click)="unstore()"> unstore </button>
        
    `
})
export class LoggerAppComponent{

    Level = Level;

    constructor(public logger:Logger){}

    logMsgs(){
        this.logger.error('This is a priority level 1 error message...');
        this.logger.warn('This is a priority level 2 warning message...');
        this.logger.info('This is a priority level 3 info message...');
        this.logger.debug('This is a priority level 4 debug message...');
        this.logger.log('This is a priority level 5 log message...');
    }

    setLevel(level:Level){
        this.logger.level = level;
    }

    clear(){
        console.clear();
    }

    store(){
        this.logger.store();
    }

    unstore(){
        this.logger.unstore();
    }

}