import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

export const logEntriesDB = new Mongo.Collection('logEntries');

if(Meteor.isServer) {
	Meteor.publish('paginatedEntries', function(pageSize, skipAmount) {
 		check(pageSize, Match.Integer)
 		check(skipAmount, Match.Integer)
 		// TODO: range check the skipAmount
		return logEntriesDB.find({}, {
			sort: { 
				date: -1,
				createdAt: -1,
			},
			limit: pageSize,
			skip: skipAmount,
		});
	});

	Meteor.publish('allEntries', function() {
		return logEntriesDB.find();	
	})
}

Meteor.methods({
	'logEntries.count'() {
		return logEntriesDB.find().count();
	},
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