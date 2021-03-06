/*
 * This file is derived from QML-Material (https://github.com/papyros/qml-material/)
 * QML Extras - Extra types and utilities to make QML even more awesome
 *
 * Copyright (C) 2014 Michael Spencer <sonrisesoftware@gmail.com>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
/*!
   \qmltype Utils
   \inqmlmodule quey.ui
   \brief Utility functions
 */
.pragma library
.import QtQuick 2.0 as QtQuick

/*!
    \qmlmethod Utils::generateID()
    Generates an id.
*/
function generateID() {
    var guid = (function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
      }
      return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
      };
    })()();
    print(guid);
    return guid;
}

/*!

    \qmlmethod Utils::findRoot(Item obj)
    Finds the QML root item.
*/
function findRoot(obj) {
    while (obj.parent) {
        obj = obj.parent;
    }

    return obj;
}

/*!
    \qmlmethod Utils::findRootChild(Item obj, string objectName)
    Finds a child of the QML root item by its \c objectName.
*/
function findRootChild(obj, objectName) {
    obj = findRoot(obj);

    var childs = new Array(0);
    childs.push(obj);
    while (childs.length > 0) {
        if (childs[0].objectName == objectName) {
            return childs[0];
        }
        for (var i in childs[0].data) {
            childs.push(childs[0].data[i]);
        }
        childs.splice(0, 1);
    }
    return null;
}


/*!
    \qmlmethod Utils::findChild(Item obj, string objectName)
    Finds a child of a QML item by its \c objectName.
*/
function findChild(obj,objectName) {
    var childs = new Array(0);
    childs.push(obj);
    while (childs.length > 0) {
        if (childs[0].objectName == objectName) {
            return childs[0];
        }
        for (var i in childs[0].data) {
            childs.push(childs[0].data[i]);
        }
        childs.splice(0, 1);
    }
    return null;
}

/*!
    \qmlmethod Utils::cherrypick(Array list, Array properties)
*/
function cherrypick(list, properties) {
    var obj, prop, i;

    if (list instanceof Array) {
        var result = [];

        for (i = 0; i < list.length; i++) {
            var item = list[i];
            obj = {};
            for (var j = 0; j < properties.length; j++) {
                prop = properties[j];
                obj[prop] = item[prop];
            }

            result.push(obj);
        }

        return result;
    } else {
        obj = {};

        for (i = 0; i < properties.length; i++) {
            prop = properties[i];
            print(prop);
            obj[prop] = list[prop];
        }

        return obj;
    }
}

/*!
    \qmlmethod Utils::newObject(string path, Object args, Item parent)
    Creates a new QML object dynamically from a given source file.
*/
function newObject(path, args, parent) {
    if (!args)
        args = {};

    args.parent = parent;

    var component = Qt.createComponent(path);
    if (component.status === QtQuick.Component.Error) {
        // Error Handling
        print("Unable to load object: " + path + "\n" + component.errorString());
        return null;
    }

    return component.createObject(parent, args);
}


/*!
    \qmlmethod Utils::nth(d)
*/
function nth(d) {
    if(d>3 && d<21)
        return 'th'; // thanks kennebec

    switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

/*!
    \qmlmethod Utils::escapeHTML(string html)
    Converts HTML special characters to their entity equivalents.
*/
function escapeHTML(html) {
    return html.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}
