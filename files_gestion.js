const fs = require('fs');

// //folder gestion

// if (fs.existsSync('./files')) {
//     fs.rmdir('./files', (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Folder succesfully deleted');
//         }
//     });
// } else {
//     fs.mkdir('./files', (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Folder succesfully created');
//         }
//     })
// };

// // creation file
// fs.writeFile('./files/file1.txt', 'hello', () => {
//     console.log('file succesfully created');
// });

// read file
// fs.readFile('./files/file1.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data.toString());
//     }
// });

// delete file
if (fs.existsSync('./files/file1.txt')) {
    fs.unlink('./files/file1.txt', (err) => {
        if (err) {
            console.log(err);
        } else {
             console.log('file succesfully deleted');
        }
    })
} else {
    console.log("file doesn't exist");
}