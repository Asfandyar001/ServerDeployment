import { useState } from "react";
import axios from "axios";

const routes = [
  { method: "POST", path: "/insertOne", body: { name: "Ali" } },

  { method: "POST", path: "/insertMany", body: { users: [{ name: "Ali" }, { name: "Ghaus" }] } },

  { method: "GET", path: "/find", body: { age: 18 } },

  { method: "GET", path: "/findOne", body: { name: "Ali" } },

  { method: "GET", path: "/findLimit", body: { limit: 2 } },

  { method: "GET", path: "/findSkip", body: { skip: 1 } },

  { method: "GET", path: "/findSort", body: { sort: -1 } },

  { method: "GET", path: "/distinct", body: { field: "name" } },

  { method: "GET", path: "/count", body: { active: true } },

  { method: "PUT", path: "/updateOne", body: { name: "Ahmad", age: 18 } },

  { method: "PUT", path: "/updateMany", body: { age: 18, minor: true } },

  { method: "PUT", path: "/replaceOne", body: { name: "Ahmad", age: 25 } },

  { method: "DELETE", path: "/deleteOne", body: { name: "Ahmad" } },

  { method: "DELETE", path: "/deleteMany", body: { active: false } },

  { method: "POST", path: "/aggregate", body: { age: 25 } },

  { method: "POST", path: "/createIndex", body: { field: "email" } },

  { method: "DELETE", path: "/dropIndex", body: { field: "email_1" } },

  { method: "GET", path: "/getIndexes" },

  { method: "PUT", path: "/findOneAndUpdate", body: { name: "Ahmad", active: true } },

  { method: "PUT", path: "/findOneAndDelete", body: { name: "Ahmad" } },

  { method: "POST", path: "/bulkWrite", body: { insertName: "Essa", updateName: "Hassan", updateAge: 20 } },

  { method: "PUT", path: "/findOneAndReplace", body: { name: "Essa", age: 20 } },

  { method: "PUT", path: "/renameCollection", body: { newName: "students" } },

  { method: "DELETE", path: "/dropCollection" },

  { method: "GET", path: "/listCollections" },
];

const App = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [response, setResponse] = useState("");

  const handleRouteChange = (e) => {
    setSelectedRoute(e.target.value);
  };

  const executeRoute = async () => {
    const route = routes.find(r => r.path === selectedRoute);
    if (!route) return;

    try {
      const { method, path, body } = route;

      console.log(`Executing ${method.toUpperCase()} ${path} with body:`, body);

      const url = `http://localhost:5000/api/user${path}`;

      let res;

      if (method === "GET" || method === "DELETE") {
        res = await axios[method.toLowerCase()](url, { params: body });
      } else {
        res = await axios[method.toLowerCase()](url, body);
      }

      setResponse(res);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>Test Routes</h2>

      <select value={selectedRoute} onChange={handleRouteChange}>

        <option value="">Select a route</option>
        {routes.map((route, index) => (
          <option key={index} value={route.path}>{route.path}</option>
        ))}

      </select>

      <button onClick={executeRoute} style={{ marginLeft: "10px" }}>Execute</button>

      <pre style={{ marginTop: "20px", backgroundColor: "#f0f0f0", padding: "10px" }}>{response}</pre>
    </div>
  );
};

export default App;