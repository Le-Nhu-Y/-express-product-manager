import multer from 'multer';
let upload = multer();
import express from "express";
import bodyParser from 'body-parser';
import Product from "./src/entity/Product";
import {AppDataSource} from "./src/data-source";
const PORT = 3000;

// thiết lập kết nối cơ sở dữ liệu
AppDataSource
    .initialize()
    .then(() => {
        console.log(__dirname)
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


const app = express();

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(bodyParser.json());
app.use(express.json());



//Bước 1: Hien thi danh sach form san pham
    // Tạo router xử lý request trả về trang danh sách sản phẩm
app.get('/products', async (req, res) => {
    let products = await AppDataSource.getRepository(Product).find();
    res.render('list', {products: products});
})


//Bước 2: Hiển thị form thêm mới sản phẩm
    //Tạo router xử lý request url "products/create" với method GET, trả về views/create.ejs
app.get('/products/create', (req, res) => {
    res.render('create')
})

    //Xử lý submit form thêm mới
    //Tạo router xử lý request với url "products/create" và method POST:
    //Lấy dữ liệu gửi đi từ body request
    //Xử lý upload file

app.post("/products/create", upload.single('image'), async (req: any, res: any) => {
    try {
        let product = new Product();
        product.price = req.body.price;
        product.name = req.body.name;
        product.image = req.file.originalname;
        product.author = req.body.author;

        const productRepository = AppDataSource.getRepository(Product)
        await productRepository.save(product);
        res.redirect("/products")
    }catch (e) {
        console.log(e.message);
    }
});
    //Thêm cấu hình thư viện multer trong file index.ts như sau:
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/public/upload')
        },
        filename: function (req, file, cb) {
            console.log(file)
            cb(null, file.originalname)
        }
    })
upload = multer({ storage: storage })


    //Cấu hình static file:
    app.use(express.static( './src/public'));





app.listen(PORT, () => {
    console.log("App running with port: " + PORT)
})