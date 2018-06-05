import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const logEntriesDB = new Mongo.Collection('logEntries');

if(Meteor.isServer) {
	Meteor.publish('logEntries', function wateringLogPublication() {
		return logEntriesDB.find();
	})
}

Meteor.methods({
	'logEntries.updateEntry'(entryId, entryTitle, entryMessage) {
		logEntriesDB.update(entryId, {
			$set: {
				title: entryTitle,
				message: entryMessage,
			}
		})

	},
	'logEntries.addNewBlankEntry'() {
		logEntriesDB.insert({
			title: '',
			message: '',
			createdAt: new Date(),
		})
	}
})