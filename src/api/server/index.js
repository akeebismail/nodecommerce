import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import wiston from 'winston';
import ajaxRouter from './ajaxRouter';
import apiRouter from './apiRouter';
import security from './lib/security';
import settings from './lib/settings';
import dashboardWebSockect from './lib/dashboardWebSocket';

const app = express();

app.set('trust proxy',1);
app.use(helmet());
app.all('*',(req, res, next)=>{
    //CORS headers
    res.header(
        'Access-Control-Allow-Origin',
        security.getAccessControlAllowOrigin()
    );
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept, Key, Authorization');
    next()
});

app.use(responseTime());
app.use(cookieParser(settings.cookieSecret));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);
app.use('/ajax', ajaxRouter);
app.use('/api', apiRouter);
app.use(logger.sendRespose);

const server = app.listen(settings.apiListenPort, ()=>{
    const serverAddress = server.address();
    wiston.info(`API running att http://localhost:${serverAddress.port}`);
});

dashboardWebSockect.listen(server);