import { propertyObjectLoader, propertyObjectUpdater } from "../device_store";

describe("Device DeviceStore Utils", () => {

  describe("propertyObjectLoader", () => {

     const testObject = {
       content: {
         test: "string"
       }
     };

    it("loads property", () => {

      const objectReturned = propertyObjectLoader("content", testObject);

      expect(objectReturned).toEqual(testObject.content);

    });

    it("returns null in case container is null or undefined", () => {

      const objectReturned = propertyObjectLoader("content", null);

      expect(objectReturned).toBeNull();

    });

    it("returns null in case property does not exist", () => {

      const objectReturned = propertyObjectLoader("doesNotExist", testObject);

      expect(objectReturned).toBeNull();

    });

  });

  describe("propertyObjectUpdater", () => {

    const testContainer = {
      content: {
        test: "string"
      }
    };

    it("updates container with given property", () => {

      const updatedContent = {
        test: "otherString"
      };

      const updatedContainerExpected = {
        ...testContainer,
        content: updatedContent
      };

      const updatedContainerReturned = propertyObjectUpdater("content", testContainer, updatedContent, testContainer);

      expect(updatedContainerReturned).toEqual(updatedContainerExpected);

    });

    it("returns init container in case old container is null or undefined", () => {


      const updatedContent = {
        test: "otherString"
      };

      const updatedContainerExpected = {
        ...testContainer,
        content: updatedContent
      };

      const updatedContainerReturned = propertyObjectUpdater("content", null, updatedContent, testContainer);

      expect(updatedContainerReturned).toEqual(updatedContainerExpected);

    });

    it("adds property in case it does not exist", () => {

      const newProp = {
        otherProp: "testing"
      };

      const updatedContainerExpected = {
        ...testContainer,
        newProp
      };

      const updatedContainerReturned = propertyObjectUpdater("newProp", testContainer, newProp, testContainer);

      expect(updatedContainerReturned).toEqual(updatedContainerExpected);

    });

  });

});
