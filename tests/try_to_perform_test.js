// ==========================================================================
// Project:   SproutCore
// Copyright: ©2006-2011 Strobe Inc. and contributors.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================
/*globals module test ok isObj equals expects same plan */

var obj;

module("Ember.tryToPerform", {
  setup: function() {
    obj = Ember.Object.create({
      foo: "bar",
      total: 12345,
      aMethodThatExists: function() {},
      aMethodThatReturnsTrue: function() { return true; },
      aMethodThatReturnsFoobar: function() { return "Foobar"; },
      aMethodThatReturnsFalse: function() { return NO; }
    });
  },
  
  teardown: function() {
    obj = undefined ;
  }
  
});

test("Should return false when asked to perform a method it does not have", function() {
  equals(Ember.tryToPerform(obj, 'aMethodThatDoesNotExist'), false);
  equals(obj.tryToPerform('aMethodThatDoesNotExist'), false);
});

test("Ember.tryToPerform -- Should pass back the return true if method returned true, false if method not implemented or returned false", function() {
  equals(Ember.tryToPerform(obj, 'aMethodThatReturnsTrue'), true, 'method that returns true');
  equals(Ember.tryToPerform(obj, 'aMethodThatReturnsFoobar'), true, 'method that returns non-false');
  equals(Ember.tryToPerform(obj, 'aMethodThatReturnsFalse'), false, 'method that returns false');
  equals(Ember.tryToPerform(obj, 'imaginaryMethod'), false, 'method that is not implemented');
});

test("obj.tryToPerform -- Should pass back the return true if method returned true, false if method not implemented or returned false", function() {
  equals(obj.tryToPerform('aMethodThatReturnsTrue'), true, 'method that returns true');
  equals(obj.tryToPerform('aMethodThatReturnsFoobar'), true, 'method that returns non-false');
  equals(obj.tryToPerform('aMethodThatReturnsFalse'), false, 'method that returns false');
  equals(obj.tryToPerform('imaginaryMethod'), false, 'method that is not implemented');
});
