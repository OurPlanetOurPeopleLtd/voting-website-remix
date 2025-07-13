interface ILogger {
    info: (msg: string) => void;
    error: (msg: string | unknown) => void;
}

export function getLogger(name: string): ILogger {
    /*const logger = new Logger(name);
    Amplify.register(logger);
    logger.addPluggable(new AWSCloudWatchProvider());
    return logger;*/

    return {
        info: msg => {
            console.log(msg)
        },
        error: msg => {
            console.log(msg)
        }
    }
}


