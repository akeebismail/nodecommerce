import {ObjectId} from 'mongodb'
import { db } from '../../lib/mongo';
import  utils  from '../../lib/utils';
import parse from '../../lib/parse';

class CustomerGroupService {
    constructor(){

    }

    getGroups(params = {}) {
        return db
            .collection('customersGroups')
            .find().toArray().then(items => items.map(item => this.changeProperties(item)));
    }

    getSingleGroup(id)
    {
        if (!ObjectId.isValid(id)){
            return Promise.reject('Invalid Identifier');
        }
        let  groupObjectId = new ObjectId(id);
        return db
            .collection('customerGroups').findOne({_id : groupObjectId})
            .then(item => this.changeProperties(item));
    }

    addGroup(data)
    {
        const group = this.getValidDocumentForInsert(data);
        return db
            .collection('customerGroups')
            .insertMany([group])
            .then(res => this.getSingleGroup(res.ops[0]._id.toString()));
    }
    updateGroup(id, data){
        if (!ObjectId.isValid(id)){
            return Promise.reject('Invalid identifier');
        }
        const groupObjectId = new ObjectId(id);
        const group = this.getValidDocumentForUpdate(id,data);

        return db
            .collection('customerGroups').updateOne(
                {
                    _id: groupObjectId
                },
                {
                    $set: group
                }
            )
            .then(res => this.getSingleGroup(id));
    }
    deleteGroup(id){
        if (!ObjectId.isValid(id)){
            return Promise.reject('Invalid identifier');
        }
        const groupObjectID = new ObjectId(id);
        return dd
            .collection('customerGroups')
            .deleteOne({_id : groupObjectID}).then(deleteResponse => {
                return deleteResponse.deletedCount > 0;
            });
    }
}
