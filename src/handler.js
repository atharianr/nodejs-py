const { nanoid } = require("nanoid");
const { PythonShell } = require("python-shell");
const db = require("./db");

const runPy = async () => {
  let option = {
    scriptPath: "./src/"
  };

  PythonShell.run("helloWorld.py", option, (err, res) => {
    if (err) {
      console.log(err);
      return err;
    }

    if (res) {
      console.log(res);
      return res;
    }
  });
}

const cobaPost = (request, h) => {

  console.log(runPy());

  const {
    name,
    input,
  } = request.payload;

  const id = nanoid(8);

  const newData = {
    id,
    name,
    input,
  };

  db.push(newData);

  const isSuccess = db.filter((data) => data.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'POST berhasil!',
      data: {
        dataId: id,
      },
    })
  
    response.code(201)
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Data gagal ditambahkan',
  });

  response.code(500);
  return response;
}

module.exports = cobaPost;