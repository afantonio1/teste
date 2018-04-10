/**
* (C) Copyright IBM Corp. 2017. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
* in compliance with the License. You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software distributed under the License
* is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
* or implied. See the License for the specific language governing permissions and limitations under
* the License.
*/

var events = require('../../events');
var state = require('../../state');
var subscribe = events.subscribe;
var publish = events.publish;
var requestGeolocationZips = [];
var requestGeolocationZipcodeLayout = {
  init: function() {
    subscribe('layout:request-geolocation-zipcode', function(data) {
      var requestGeolocationZip = new RequestGeolocationZip(data);
      requestGeolocationZips[data.uuid] = requestGeolocationZip;
    });
  }
};

function RequestGeolocationZip(data) {
  this.init(data);
}

RequestGeolocationZip.prototype.init = function(data) {
  var current = state.get();
  if(current.defaultCountry) {
    state.set({
      handleInput: {
        default: false,
        callback: function(msg, resolve, reject) {
          var current = state.get();
          resolve();
          state.set({
            handleInput: {
              default: true,
              callback: undefined
            }
          });
          publish('send', {
            text: msg + ', ' + current.defaultCountry,
            silent: true
          });
        }
      }
    });
  }
};

module.exports = requestGeolocationZipcodeLayout;
