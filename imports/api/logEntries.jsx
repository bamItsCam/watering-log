import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const logEntriesDB = new Mongo.Collection('logEntries');

if(Meteor.isServer) {
	Meteor.publish('logEntries', function wateringLogPublication() {
		return logEntriesDB.find();
	});
}

Meteor.methods({
	'logEntries.updateEntry'(entryId, entryAuthor, entryTitle, entryMessage) {
		logEntriesDB.update(entryId, {
			$set: {
				title: entryTitle,
				message: entryMessage,
			}
		});

	},
	'logEntries.addEntry'(entryAuthor, entryNotes, entryDate, entryTime) {
		logEntriesDB.insert({
			author: entryAuthor,
			notes: entryNotes,
			date: entryDate,
			time: entryTime,
			createdAt: new Date(),
		});
	},
	'logEntries.deleteEntry'(entryId) {
		logEntriesDB.remove(entryId);
	}
})