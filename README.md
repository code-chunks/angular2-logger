# Angular2-Logger

[![Build Status](https://travis-ci.org/code-chunks/angular2-logger.svg?branch=master)](https://travis-ci.org/code-chunks/angular2-logger)
[![npm version](https://badge.fury.io/js/angular2-logger.svg)](https://badge.fury.io/js/angular2-logger)
[![Join the chat at https://gitter.im/code-chunks/angular2-logger](https://badges.gitter.im/code-chunks/angular2-logger.svg)](https://gitter.im/code-chunks/angular2-logger?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/code-chunks/angular2-logger/master/LICENSE)
[![Support](https://supporter.60devs.com/api/b/cjv93jwfwck3yp8z2mn1d9gay)](https://supporter.60devs.com/give/cjv93jwfwck3yp8z2mn1d9gay)

## What is it?

A simpler [Log4j](http://logging.apache.org/log4j/2.x/) inspired logger module for [Angular 2](https://angular.io/). Think of it as "Log4ng" ... get it?

This is a work in progress and is not quite yet ready for production, use with care.

## Usage

### Quicktart

Install the npm module.
    
    npm install --save angular2-logger

Setup the Provider.

    import {Logger} from "angular2-logger/logger";
   
    bootstrap( App, [ Logger ]); 

Add `angular2-logger` to your `Systemjs` configuration.*
If you are following the [Angular 2's Quickstart Guide](https://angular.io/docs/ts/latest/quickstart.html) it should be something like this:

    System.config({
        map: { 'angular2-logger': 'node_modules/angular2-logger' },
        packages: {
            app: {
                format: 'register',
                defaultExtension: 'js'
            },
            'angular2-logger': {
                format: 'register',
                defaultExtension: 'js'
            }
        }
    });

Inject the logger into your objects and use it.

    @Component({
        ...
    })
    export class App(){
        constructor(private _logger:Logger){
            this._logger.error('This is a priority level 1 error message...');
            this._logger.warn('This is a priority level 2 warning message...');
            this._logger.info('This is a priority level 3 warning message...');
            this._logger.debug('This is a priority level 4 debug message...');
            this._logger.log('This is a priority level 5 log message...');
        }
    }
    
By default the logger level will be set to `Level.WARN`, so you'll only see Warning and Error messages. 

### Going deeper...

In order to see all of the messages you just need to change the logger message hierarchy level, you can do so:

- Dynamically using the console:

        logger.level = logger.Level.LOG; // same as: logger.level = 5;      
    
- Or using one of the predefined configuration providers:

        import {Logger} from "angular2-logger/logger";
       
        bootstrap( App, [ LOG_LOGGER_PROVIDERS ]);

    The available Providers are:

        ERROR_LOGGER_PROVIDERS
        WARN_LOGGER_PROVIDERS
        INFO_LOGGER_PROVIDERS
        DEBUG_LOGGER_PROVIDERS
        LOG_LOGGER_PROVIDERS

Note: If you change the level of the Logger dynamically, that setting will be lost upon refreshing the page and set back to its default configured setting.
If you want the logger to keep this setting changed, store it in the localStorage by doing:

    logger.store() // and logger.unstore() to undo.

#### Custom Configuration

If the Providers included don't meet your needs you can configure the default logger configuration by Providing custom properties:

    import { Logger, Options, Level } from "angular2-logger/logger";

    bootstrap(AppComponent,[
        //<Options> casting is optional, it'll help you with type checking if using an IDE.
        provide( Options, { useValue: <Options>{ store: false } } ),
        Logger
    ]);

As you can see you don't have to specify all of them, just the ones you want to override.

The available configuration options are:

* `level:Level` - How much detail you want to see in the logs; `Level.ERROR` (1) being the less detailed and `Level.LOG` (5) being the most. Defaults to `Level.WARN` (2).

    The Hierarchy of the messages is as follows from highest to lowest priority:

     1. `Level.ERROR`
     2. `Level.WARN`
     3. `Level.INFO`
     4. `Level.DEBUG`
     5. `Level.LOG`

     The Logger will log everything with higher or equal priority to the current `logger.level` set.

* `global:boolean` - Whether or not you want the created logger object to be exposed in the global scope. Defaults to `true`.
* `globalAs:string` - The window's property name that will hold the logger object created. Defaults to `'logger'`.
* `store:boolean` - Whether you want the level config to be saved in the local storage so it doesn't get lost when you refresh. Defaults to `false`.
* `storeAs:string` - The local storage key that will be used to save the level config if the store setting is true. Defaults to `'angular2.logger.level'`.

You can also override the default configuration options by extending the Options and injecting yours instead:

    // from custom-logger-options.ts
    ...
    @Injectable() export class CustomLoggerOptions(){
        store: true
    }
    ...

    // from boot.ts/main.ts
    ...
    bootstrap(AppComponent,[
        provide( Options,{ useClass: CustomLoggerOptions } ),
        Logger
    ]);

Class names like `Options` and `Level` might be too common, if you get a conflict you can rename them like this:

    import { Logger, Options as LoggerOptions, Level as LoggerLevel } from "angular2-logger/logger";

    bootstrap(AppComponent,[
        provide( LoggerOptions,{ useValue: {
            level: LoggerLevel.WARN,
            ...

## TODO

- Support different loaders and modes.
- Ability to add logging time to the messages.
- Support named loggers.
- No coding required Dashboard UI to handle loggers.

*This step is only temporary until future, hopefully soon, improvements.

## LICENSE

[MIT](https://opensource.org/licenses/MIT)