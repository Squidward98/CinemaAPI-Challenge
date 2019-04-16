// ============================
// PORT
// ============================

process.env.PORT = 3000;

// ============================
// NODE_ENV
// ============================

process.env.NODE_ENV = 'dev';

// ============================
// DATABASE
// ============================

let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cinema';
} 

process.env.URLDB = urlDB;

// ============================
// Token's expiration date
// ============================

process.env.EXPIRATION_DATE_TOKEN = '48h';

// ============================
// Token's SEED
// ============================

process.env.SEED = 'this-is-the-dev-seed';

