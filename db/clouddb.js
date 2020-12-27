const DB_USER = "bipin";
const DB_PASSWORD = "EHBAHcXNMeWizfPf";
const DB_NAME = "udemysample";
const CLUSTER_HOST = "apidemo.rnpog.mongodb.net";

exports.DB_URI = `mongodb+srv://user-${DB_USER}:${DB_PASSWORD}@${CLUSTER_HOST}/${DB_NAME}?retryWrites=true&w=majority`;