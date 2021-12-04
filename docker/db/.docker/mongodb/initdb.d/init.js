conn = new Mongo();
db = conn.getDB("admin");
db.auth("sa", "123");
db = db.getSiblingDB("coworkersDB");
db.createUser({
    'user': "sa",
    'pwd': "123",
    'roles': [{
        'role': 'dbOwner',
        'db': 'coworkersDB'
    }]
});