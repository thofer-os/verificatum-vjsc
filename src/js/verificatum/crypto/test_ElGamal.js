
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
// ################### Test ElGamal.js ##################################
// ######################################################################

M4_NEEDS(verificatum/crypto/ElGamal.js)dnl

var test_ElGamal = (function () {
    var prefix = "verificatum.crypto.ElGamal";
    var arithm = verificatum.arithm;
    var crypto = verificatum.crypto;
    var test = verificatum.dev.test;

dnl Public keys generated by Verificatum Mix-Net.
M4_INCLUDE(verificatum/crypto/test_ElGamal_params.js)dnl

    var gen_encrypt_decrypt = function (testTime) {
        var e;
        var end = test.start([prefix + " (encrypt and decrypt)"], testTime);

        var pGroups = test_arithm.test_ModPGroup.pGroups;

        var maxKeyWidth = 3;
        var maxWidth = 4;

        var i = 0;
        while (!test.done(end)) {

            var keyWidth = 1;
            while (keyWidth <= maxKeyWidth) {

                var yGroup = arithm.PGroup.getWideGroup(pGroups[i], keyWidth);

                for (var l = 0; l < 2; l++) {

                    var eg = new crypto.ElGamal(l === 0,
                                                yGroup, randomSource, statDist);

                    var keys = eg.gen();

                    var pk = keys[0];
                    var sk = keys[1];

                    var width = 1;
                    while (width <= maxWidth) {

                        var wpk = eg.widePublicKey(pk, width);
                        var wsk = eg.widePrivateKey(sk, width);

                        var m =
                            wpk.project(1).pGroup.randomElement(randomSource,
                                                                statDist);

                        for (var j = 0; j < 2; j++) {

                            var c;
                            if (j === 0) {
                                var r = wsk.pRing.randomElement(randomSource,
                                                                statDist);
                                c = eg.encrypt(wpk, m, r);
                            } else {
                                c = eg.encrypt(wpk, m);
                            }
                            var a = eg.decrypt(wsk, c);

                            if (!a.equals(m)) {
                                var e = "ElGamal failed!"
                                    + "\npk = " + pk.toString()
                                    + "\nsk = " + sk.toString()
                                    + "\nkeyWidth = " + keyWidth
                                    + "\nwpk = " + wpk.toString()
                                    + "\nwsk = " + wsk.toString()
                                    + "\nwidth = " + width
                                    + "\nm = " + m.toString()
                                    + "\nc = " + c.toString()
                                    + "\na = " + a.toString();
                                if (j === 0) {
                                    e += "\nr = " + r.toString();
                                }
                                test.error(e);
                            }
                        }
                        width++;
                    }
                }
                keyWidth++;
            }
            i = (i + 1) % pGroups.length;
        }
        test.end();
    };

    var run = function (testTime) {
        gen_encrypt_decrypt(testTime);
    };
    return {run: run};
})();
