const express = require("express");
const multer = require("multer");
const {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
} = require("firebase/firestore");
const {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} = require("firebase/storage");

const { validateToken } = require("../middleware/validateTokenHandler");
const { app } = require("../index");
const storage = getStorage(app, "blogging-platform-c87fd.appspot.com");
const multerStoreage = multer.memoryStorage();
const db = getFirestore();
const blogref = collection(db, "Blogs");
const router = express.Router();

router.use(validateToken);

// add
router.get("/add", function (req, res, next) {
    res.render("add_blog", { title: "Create new blog" });
});

// add action
const upload = multer({ storage: multerStoreage }).single("image");
router.post("/add", upload, function (req, res, next) {
    const { header, sub_header, content, image_header } = req.body;

    if (!header || !sub_header || !content) {
        res.status(400);
        throw new Error("Please fill in required fields!");
    }

    if (req.file !== undefined) {
        const storageRef = ref(
            storage,
            req.file.originalname,
            req.file.mimetype
        );
        const metadata = { contentType: req.file.mimetype };
        const uploadTask = uploadBytesResumable(
            storageRef,
            req.file.buffer,
            metadata
        );
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploaded = Math.floor(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (error) => {
                console.log(error);
            },
            async () => {
                imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                const docRef = addDoc(blogref, {
                    header: header,
                    sub_header: sub_header,
                    content: content,
                    imageUrl: imageUrl,
                    image_header: image_header,
                });
            }
        );
    }

    res.status(200).json({ success: true });
});

//get list
router.post("/list", function (req, res, next) {});

//get detail
router.get("/:id", function (req, res, next) {});

//update
router.put("/:id", function (req, res, next) {
    //const snapshot_update = await updateDoc(colref);
});

//delete
router.delete("/:id", function (req, res, next) {});

//const { getFirestore, collection, getDocs } = require ( 'firebase/firestore' );
//const db = getFirestore ();
//// initializing the firestore;
//const colref = collection ( db, 'Blogs' );
//// where Blogs is the document name

//const { getDocs , updateDoc } = require ( 'firebase/firestore' );
//const snapshot = await getDocs(colref);
//const snapshot_update = await updateDoc(colref);
//const snapshot_add = await addDoc(colref, {...});

module.exports = router;
