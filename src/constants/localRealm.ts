import Realm from 'realm';
const LocalDbSchema: any = {
  name: 'LocalDb',
  primaryKey: 'email',
  properties: {
    email: 'string',
    password: 'string',
  },
};

const options = {
  path: 'myrealm',
  schema: [LocalDbSchema],
};

const addCurrentUser = async (data: any) => {
  console.log('Adding User');
  Realm.open(options).then(realm => {
    realm.write(() => {
      realm.create('LocalDb', {email: data.email, password: data.password});
    });
  });
};

const RemoveCurrentUser = async () => {
  Realm.open(options).then(realm => {
    const user = realm.objects('LocalDb');
    realm.write(() => {
      realm.delete(user);
    });
    realm.close();
  });
};

const getCurrentUser = async () => {
  console.log('Getting User');
  const realm = await Realm.open(options);
  return realm.objects('LocalDb');
};

export {addCurrentUser, getCurrentUser, RemoveCurrentUser};
