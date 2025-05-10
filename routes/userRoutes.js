const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/insertOne", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const result = await User.collection.insertOne({ name: name });
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error in insertOne()");
        res.status(500).json({ error: error.message });
    }
});

router.post("/insertMany", async (req, res) => {
    try {
        const { users } = req.body;
        if (!users || !Array.isArray(users)) {
            return res.status(400).json({ error: "Users must be an array" });
        }
        const result = await User.collection.insertMany(users);
        res.status(200).json(result);

    } catch (error) {
        console.error("Error in insertMany()");
        res.status(500).json({ error: error.message });
    }
});

router.post("/find", async (req, res) => {
    try {
        const { age } = req.body;
        if (!age) {
            return res.status(400).json({ error: "Age is required" });
        }
        const result = await User.collection.find({ age: { $gt: age } }).toArray();
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error in find()");
        res.status(500).json({ error: error.message });
    }
});

router.get("/findOne", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const result = await User.collection.findOne({ name: name });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in findOne()");
        res.status(500).json({ error: error.message });
    }
})

router.post("/findLimit", async (req, res) => {
    try {
        const { limit } = req.body;
        if (!limit) {
            return res.status(400).json({ error: "Limit is required" });
        }
        const result = await User.collection.find().limit(limit).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in findLimit()");
        res.status(500).json({ error: error.message });
    }
});

router.post("/findSkip", async (req, res) => {
    try {
        const { skip } = req.body;
        if (!skip) {
            return res.status(400).json({ error: "Skip is required" });
        }
        const result = await User.collection.find().skip(skip).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in findSkip()");
        res.status(500).json({ error: error.message });
    }
});

router.post("/findSort", async (req, res) => {
    try {
        const { sort } = req.body;
        if (!sort) {
            return res.status(400).json({ error: "Sort value is required" });
        }
        const result = await User.collection.find().sort({ age: sort });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in find().Sort()");
        res.status(500).json({ error: error.message });
    }
});

router.get("/distinct", async (req, res) => {
    try {
        const { field } = req.body;
        if (!field) {
            return res.status(400).json({ error: "Field is required" });
        }
        const result = await User.collection.distinct(field);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in distinct()");
        res.status(500).json({ error: error.message });
    }
});

router.get("/count", async (req, res) => {
    try {
        const { active } = req.query;
        const isActive = active === "true";
        const result = await User.collection.countDocuments({ active: isActive });
        res.status(200).json({ count: result });
    } catch (error) {
        console.error("Error in count()");
        res.status(500).json({ error: error.message });
    }
});

router.put("/updateOne", async (req, res) => {
    try {
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(400).json({ error: "Name and age are required" });
        }
        const result = await User.collection.updateOne({ name: name }, { $set: { age: age } });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in updateOne()");
        res.status(500).json({ error: error.message });
    }
});

router.put("/updateMany", async (req, res) => {
    try {
        const { age, minor } = req.body;
        if (!age || !minor) {
            return res.status(400).json({ error: "Age and minor info are required" });
        }
        const result = await User.collection.updateMany({ age: { $lt: age } }, { $set: { minor: true } })
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in updateMany()");
        res.status(500).json({ error: error.message });
    }
})

router.put("/replaceOne", async (req, res) => {
    try {
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(400).json({ error: "Name and age are required" });
        }
        const result = await User.collection.replaceOne({ name: name }, { name: name, age: age });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in replaceOne()");
        res.status(500).json({ error: error.message });
    }
});

router.delete("/deleteOne", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const result = await User.collection.deleteOne({ name: name });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in deleteOne()");
        res.status(500).json({ error: error.message });
    }
});

router.delete("/deleteMany", async (req, res) => {
    try {
        const { active } = req.body;
        if (!active) {
            return res.status(400).json({ error: "active status is required" });
        }
        const result = await User.collection.deleteMany({ active: active });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in deleteMany()");
        res.status(500).json({ error: error.message });
    }
});

router.post("/aggregate", async (req, res) => {
    try {
        const { age } = req.body;
        if (!age) {
            return res.status(400).json({ error: "Age is required" });
        }
        const format = [{ $match: { age: { $gt: age } } }, { $group: { _id: "$city", count: { $sum: 1 } } }];
        const result = await User.collection.aggregate(format).toArray();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in aggregateExample()");
        res.status(500).json({ error: error.message });
    }
});

router.post("/createIndex", async (req, res) => {
    try {
        const { field } = req.body;
        if (!field) {
            return res.status(400).json({ error: "Field is required" });
        }
        const result = await User.collection.createIndex({ [field]: 1 }, { unique: true });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in createIndex()");
        res.status(500).json({ error: error.message });
    }
});

router.delete("/dropIndex", async (req, res) => {
    try {
        const { field } = req.body;
        if (!field) {
            return res.status(400).json({ error: "Field is required" });
        }
        const result = await User.collection.dropIndex(field);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in dropIndex()");
        res.status(500).json({ error: error.message });
    }
});

router.get("/getIndexes", async (req, res) => {
    try {
        const result = await User.collection.getIndexes();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getIndexes()");
        res.status(500).json({ error: error.message });
    }
});

router.put("/findOneAndUpdate", async (req, res) => {
    try {
        const { name, active } = req.body;
        if (!name || !active) {
            return res.status(400).json({ error: "Name and active status are required" });
        }
        const result = await User.collection.findOneAndUpdate({ name: name }, { $set: { active: active } }, { returnDocument: "after" });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in findOneAndUpdate()");
        res.status(500).json({ error: error.message });
    }
});

router.delete("/findOneAndDelete", async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const result = await User.collection.findOneAndDelete({ name: name });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in findOneAndDelete()");
        res.status(500).json({ error: error.message });
    }
});

router.post("/bulkWrite", async (req, res) => {
    try {
        const { insertName, updateName, updateAge } = req.body;
        if (!insertName || !updateName || !updateAge) {
            return res.status(400).json({ error: "Insert name, update name, and update age are required" });
        }
        const format = [
            {
                insertOne: { document: { name: insertName, } }
            }, {
                updateOne: { filter: { name: updateName }, update: { $set: { age: updateAge } } }
            }
        ];
        const result = await User.collection.bulkWrite(format);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in bulkWrite():", error.message);
        res.status(500).json({ error: error.message });
    }
});

router.put("/findOneAndReplace", async (req, res) => {
    try {
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(400).json({ error: "Name and age are required" });
        }
        const result = await User.collection.findOneAndReplace({ name: name }, { name: name, age: age });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in findOneAndReplace()");
        res.status(500).json({ error: error.message });
    }
});

router.put("/renameCollection", async (req, res) => {
    try {
        const { newName } = req.body;
        if (!newName) {
            return res.status(400).json({ error: "New name is required" });
        }
        const result = await User.collection.rename(newName);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in renameCollection()");
        res.status(500).json({ error: error.message });
    }
});

router.delete("/dropCollection", async (req, res) => {
    try {
        const result = await User.collection.drop();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in dropCollection()");
        res.status(500).json({ error: error.message });
    }
});

router.get("/listCollections", async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.status(200).json(collections);
    } catch (error) {
        console.error("Error in listCollections()");
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;