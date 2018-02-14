
// Copyright 2008-2018 Douglas Wikstrom
//
// This file is part of Verificatum JavaScript Cryptographic library
// (VJSC).
//
// VJSC is free software: you can redistribute it and/or modify it
// under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// VJSC is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
// or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General
// Public License for more details.
//
// You should have received a copy of the GNU Affero General Public
// License along with VJSC. If not, see <http://www.gnu.org/licenses/>.

// ######################################################################
// ################### Test eio.js ######################################
// ######################################################################

M4_INCLUDE(verificatum/verificatum.js)dnl
M4_INCLUDE(verificatum/dev/dev.js)dnl

var test_eio = (function () {
    var test = verificatum.dev.test;
    var eio = verificatum.eio;
    var randomSource = new verificatum.crypto.RandomDevice();

dnl Test byte trees.
M4_INCLUDE(verificatum/eio/test_ByteTree.js)dnl

    var run = function (testTime) {
        test.startSet("verificatum/eio/");
        test_ByteTree.run(testTime);
    };
    return {
        test_ByteTree: test_ByteTree,
        run: run,
    };
})();
