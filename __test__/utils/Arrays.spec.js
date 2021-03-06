import Arrays from "utils/Arrays";// eslint-disable-line
import chai from "chai";// eslint-disable-line import/no-extraneous-dependencies

/** @test {Arrays} */

describe("Arrays.js", () => {
    /** @test {Arrays#remove} */
    it("remove", () => {
        let array = ["a", "b", "c"];
        let removeExpected = ["b", "c"];
        chai.assert.equal(Arrays.remove(array, "a"), true);
        chai.assert.deepEqual(array, removeExpected);
        chai.assert.equal(Arrays.remove(array, "a"), false);
    });
    /** @test {Arrays#removeByKey} */
    it("removeByKey", () => {
        let array = [{ id: 1, name: "a" }, { id: 2, name: "b" }];
        let removeExpected = [{ id: 2, name: "b" }];
        chai.assert.equal(Arrays.removeByKey(array, "id", { id: 1, name: "a" }), true);
        chai.assert.deepEqual(array, removeExpected);
        chai.assert.equal(Arrays.removeByKey(array, "id", { id: 1, name: "a" }), false);
    });

    it("indexOf", () => {
        /** @test {Arrays#indexOf} */
        let array = ["a", "b", "c"];
        chai.assert.equal(Arrays.indexOf(array, "a"), 0);
        chai.assert.equal(Arrays.indexOf(array, "b"), 1);
        chai.assert.equal(Arrays.indexOf(array, "d"), -1);
    });


    it("indexOfByKey", () => {
        /** @test {Arrays#indexOf} */
        let array = [
            { key: "a", value: "a1" },
            { key: "b", value: "b1" },
            { key: "c", value: "c1" }
        ];
        chai.assert.equal(Arrays.indexOfByKey(array, "key", "a"), 0);
        chai.assert.equal(Arrays.indexOfByKey(array, "key", "b"), 1);
        chai.assert.equal(Arrays.indexOfByKey(array, "key", "d"), -1);
    });

    it("getValueByKey", () => {
        let array = [{ id: 1, name: "a" }, { id: 2, name: "b" }];
        let removeExpected = { id: 2, name: "b" };
        let result = Arrays.getValueByKey(array, "id", 2);
        chai.assert.deepEqual(result, removeExpected);
        chai.assert.equal(Arrays.getValueByKey(array, "id", 3), undefined);
    });
    it("isExistByKey", () => {
        let array = [{ id: 1, name: "a" }, { id: 2, name: "b" }];
        chai.assert.equal(Arrays.isExistByKey(array, "id", { id: 1, name: "a" }), true);
        chai.assert.equal(Arrays.isExistByKey(array, "id", { id: 3, name: "a" }), false);
    });

    it("extractArray", () => {
        let array = [
            { key: "a", value: "a1" },
            { key: "b", value: "b1" },
            { key: "c", value: "c1" }];
        let expectedKeyArray = ["a", "b", "c"];
        let valueArray = Arrays.extractValueArray(array, "key");
        chai.assert.deepEqual(valueArray, expectedKeyArray);
    });

    it("extractItemArray", () => {
        let array = [
            { key: "a", value: "a1" },
            { key: "a", value: "b1" },
            { key: "c", value: "c1" }];
        let expectedKeyArray = [
            { key: "a", value: "a1" },
            { key: "a", value: "b1" }];
        let valueArray = Arrays.extractItemArray(array, "key", "a");
        chai.assert.deepEqual(valueArray, expectedKeyArray);
    });

    it("mergeArrays", () => {
        let array1 = ["a", "b", "c"];
        let array2 = ["a", "d", "e"];
        let result = Arrays.mergeArrays(array1, array2);

        let expectedKeyArray = [
            "a", "b", "c", "d", "e"
        ];
        chai.assert.deepEqual(expectedKeyArray, result);
    });

    it("mergeArraysForNativeType", () => {
        let array1 = ["a", "b", "c"];
        let array2 = ["a", "d", "e"];
        let result = Arrays.mergeArraysForNativeType(array1, array2);
        let expectedKeyArray = [
            "a", "b", "c", "d", "e"
        ];
        chai.assert.deepEqual(expectedKeyArray, result);
    });

    it("removeAll", () => {
        let expectedKeyArray = ["b", "c"];

        let array1 = ["a", "b", "c"];
        let removeArray1 = ["a", "d"];
        let result = Arrays.removeAll(array1, removeArray1);

        chai.assert.deepEqual(expectedKeyArray, result);
    });

    it("removeAllForNativeType", () => {
        let expectedKeyArray = ["b", "c"];

        let array1 = ["a", "b", "c"];
        let removeArray1 = ["a", "d"];
        let result = Arrays.removeAllForNativeType(array1, removeArray1);

        chai.assert.deepEqual(expectedKeyArray, result);
    });

});
