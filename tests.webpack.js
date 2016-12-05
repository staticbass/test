/**
 * Created by supervlad on 26.04.16.
 */

'use strict';

const context = require.context('./tests', true, /-test\.js$/);

context.keys().forEach(context);