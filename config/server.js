const dbHost = process.env.DB_HOST || '127.00.1';
const dbPort = processs.env.DB_PORT || 27017;
const dbName = process.env.DB_NAME  || 'shop';
const dbUser = process.env.DB_USER || '';
const dbPass = process.env.DB_PASS || '';
const dbCred =
    dbUser.length > 0 || dbPass.length > 0 ? `${dbUser}:${dbPass}@`: '';
const dbUrl =
    process.env.DB_URL || `mongodb://${dbCred}${dbHost}:${dbPort}/${dbName}`;
module.exports = {
    apiBaseUrl: `http://localhost:3001/api/v1`,
    ajaxBaseUrl: `http://localhost:3001/ajax`,
    storeBaseUrl : `http://localhost:3000`,
    adminLoginUrl : '/admin/login',
    apiListenPort: 3001,
    storeListenPort: 3000,
    mongodbServerUrl : dbUrl,
    smtpServer: {
        host: '',
        port: 0,
        secure: true,
        user: '',
        pass: '',
        fromName: '',
        fromAddress : ''
    },
    jwtSecretKey: '-',
    cookieSecret: '-',
    //path to uploads
    categoriesUploadPath: 'public/content/images/categories',
    productsUploadPath: 'public/content/images/products',
    filesUploadPath: 'public/content',
    themeAssetsUploadPath: 'theme/assets/images',
    //url to uploads
    categoriesUploadUrl : '/images/categories',
    productsUploadUrl: 'images/products',
    filesUploadUrl : '',
    themeAssetsUploadUrl : 'assets/images',
    language: 'en',
    orderStartNumber : 1000,
    developerMode: true

};