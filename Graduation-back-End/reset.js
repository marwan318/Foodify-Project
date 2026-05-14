const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/food-project-db')
    .then(async () => {
        // السطر ده بيمسح الداتا بيز من جذورها
        await mongoose.connection.dropDatabase(); 
        console.log("💣 تم تدمير الداتا بيز القديمة بنجاح! إحنا دلوقتي على نضافة.");
        process.exit();
    })
    .catch(err => console.log(err));