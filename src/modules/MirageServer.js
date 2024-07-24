import { createServer } from "miragejs";

export function makeServer() {
  let server = createServer({
    routes() {
      this.namespace = "api";

      let items = [
        { name: "Jake Peralta" },
        { name: "Rosa Diaz" },
        { name: "Terry Jeffords" },
        { name: "Amy Santiago" },
        { name: "Charles Boyle" },
        { name: "Gina Linetti" },
        { name: "Raymond Holt" },
        { name: "Michael Hitchcock" },
        { name: "Norm Scully" },
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
      this.delete("/items/:name", (schema, request) => {
        let name = request.params.name;
        items = items.filter((item) => item.name !== parseInt(name));
        return { name };
      });
    },
  });

  return server;
}
