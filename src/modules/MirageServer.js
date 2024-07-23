import { createServer } from "miragejs";

export function makeServer() {
  let server = createServer({
    routes() {
      this.namespace = "api";

      let items = [
        { id: 1, name: "Jake Peralta" },
        { id: 2, name: "Rosa Diaz" },
        { id: 3, name: "Terry Jeffords" },
        { id: 4, name: "Amy Santiago" },
        { id: 5, name: "Charles Boyle" },
        { id: 6, name: "Gina Linetti" },
        { id: 7, name: "Raymond Holt" },
        { id: 8, name: "Michael Hitchcock" },
        { id: 9, name: "Norm Scully" }
      ];

      // Get all items
      this.get("/items", () => {
        return items;
      });

      // Add a new item
      this.post("/items", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.id = items.length + 1;
        items.push(attrs);
        return attrs;
      });

      // Remove an item
      this.delete("/items/:id", (schema, request) => {
        let id = request.params.id;
        items = items.filter(item => item.id !== parseInt(id));
        return { id };
      });
    },
  });

  return server;
}
