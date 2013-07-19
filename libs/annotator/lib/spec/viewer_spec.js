// Generated by CoffeeScript 1.6.3
describe('Annotator.Viewer', function() {
  var viewer;
  viewer = null;
  beforeEach(function() {
    return viewer = new Annotator.Viewer();
  });
  afterEach(function() {
    return viewer.element.remove();
  });
  it("should have an element property", function() {
    assert.ok(viewer.element);
    return assert.isTrue(viewer.element.hasClass('annotator-viewer'));
  });
  describe("an annotation element", function() {
    it("should contain some controls", function() {
      viewer.load([
        {
          text: "Hello there"
        }
      ]);
      return assert.operator(viewer.element.find('.annotator-controls:first button').length, '>', 0);
    });
    it("should NOT contain any controls if options.readOnly is true", function() {
      viewer = new Annotator.Viewer({
        readOnly: true
      });
      viewer.load([
        {
          text: "Hello there"
        }
      ]);
      return assert.lengthOf(viewer.element.find('.annotator-controls:first button'), 0);
    });
    it("should contain an external link to the annotation if the annotation provides one", function() {
      viewer.load([
        {
          links: [
            {
              rel: "alternate",
              href: "http://example.com/foo",
              type: "text/html"
            }
          ]
        }
      ]);
      return assert.equal(viewer.element.find('.annotator-controls:first a.annotator-link').attr('href'), 'http://example.com/foo');
    });
    return it("should NOT contain an external link to the annotation if the annotation doesn't provide one", function() {
      viewer.load([
        {
          text: "Hello there"
        }
      ]);
      return assert.lengthOf(viewer.element.find('.annotator-controls:first a.annotator-link'), 0);
    });
  });
  describe("events", function() {
    beforeEach(function() {
      return viewer.element.find('ul').append(viewer.html.item);
    });
    it("should call Viewer#onEditClick() when the edit button is clicked", function() {
      sinon.spy(viewer, 'onEditClick');
      viewer.element.find('.annotator-edit').click();
      return assert(viewer.onEditClick.calledOnce);
    });
    return it("should call Viewer#onDeleteClick() when the delete button is clicked", function() {
      sinon.spy(viewer, 'onDeleteClick');
      viewer.element.find('.annotator-delete').click();
      return assert(viewer.onDeleteClick.calledOnce);
    });
  });
  describe("show", function() {
    return it("should make the viewer visible", function() {
      viewer.show();
      return assert.isFalse(viewer.element.hasClass(viewer.classes.hide));
    });
  });
  describe("isShown", function() {
    it("should return true if the viewer is visible", function() {
      viewer.show();
      return assert.isTrue(viewer.isShown());
    });
    return it("should return false if the viewer is not visible", function() {
      viewer.hide();
      return assert.isFalse(viewer.isShown());
    });
  });
  describe("hide", function() {
    return it("should hide the viewer from view", function() {
      viewer.hide();
      return assert.isTrue(viewer.element.hasClass(viewer.classes.hide));
    });
  });
  describe("load", function() {
    beforeEach(function() {
      viewer.annotations = [
        {
          text: 'test'
        }
      ];
      viewer.fields = [
        {
          element: $('<div />')[0],
          load: sinon.spy()
        }, {
          element: $('<div />')[0],
          load: sinon.spy()
        }
      ];
      return viewer.load([
        {
          text: 'Hello there'
        }
      ]);
    });
    it("should call #show()", function() {
      sinon.spy(viewer, 'show');
      viewer.load();
      return assert(viewer.show.calledOnce);
    });
    it("should set the current annotation", function() {
      return assert.equal(viewer.annotations[0].text, 'Hello there');
    });
    it("should call the load callback on each field in the group", function() {
      assert(viewer.fields[0].load.calledOnce);
      return assert(viewer.fields[1].load.calledOnce);
    });
    return it("should pass the cloned field element and an annotation to the callback", function() {
      var args;
      args = viewer.fields[0].load.lastCall.args;
      assert.equal(args[0], viewer.element.find('div:first')[0]);
      assert.equal(args[1], viewer.annotations[0]);
      assert.ok(args[2].showEdit);
      assert.ok(args[2].hideEdit);
      assert.ok(args[2].showDelete);
      return assert.ok(args[2].hideDelete);
    });
  });
  describe("addField", function() {
    return it("should append a new field to the @fields property", function() {
      var length;
      length = viewer.fields.length;
      viewer.addField();
      assert.lengthOf(viewer.fields, length + 1);
      viewer.addField();
      return assert.lengthOf(viewer.fields, length + 2);
    });
  });
  describe("onEditClick", function() {
    return it("should call onButtonClick and provide an event to trigger", function() {
      var event;
      sinon.spy(viewer, 'onButtonClick');
      event = {};
      viewer.onEditClick(event);
      assert(viewer.onButtonClick.calledOnce);
      return assert.isTrue(viewer.onButtonClick.calledWith(event, 'edit'));
    });
  });
  describe("onDeleteClick", function() {
    return it("should call onButtonClick and provide an event to trigger", function() {
      var event;
      sinon.spy(viewer, 'onButtonClick');
      event = {};
      viewer.onDeleteClick(event);
      assert(viewer.onButtonClick.calledOnce);
      return assert.isTrue(viewer.onButtonClick.calledWith(event, 'delete'));
    });
  });
  return describe("onButtonClick", function() {
    var listener;
    listener = null;
    beforeEach(function() {
      listener = sinon.spy();
      return viewer.element.bind('edit', listener);
    });
    it("should trigger an 'edit' event", function() {
      viewer.onButtonClick({}, 'edit');
      return assert(listener.calledOnce);
    });
    return it("should pass in the annotation object associated with the item", function() {
      var annotation, button, item;
      annotation = {};
      item = $('<div class="annotator-annotation" />').data('annotation', annotation);
      button = $('<button />').appendTo(item)[0];
      viewer.onButtonClick({
        target: button
      }, 'edit');
      return assert.equal(listener.lastCall.args[1], annotation);
    });
  });
});

/*
//@ sourceMappingURL=viewer_spec.map
*/
