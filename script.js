function validate() {
    var user = document.getElementById("username").value;

    //console.log(user);
    const url = `https://api.github.com/users/${user}`;
    const repoUrl = `https://api.github.com/users/${user}/repos`;
    let dizi = [];
    let sayi = 0;
    let totalsize = 0;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = res.json();

        return data;
      })
      .then((data) => {

        document.getElementById('image').src = data.avatar_url;
        document.getElementById('nameLastname').innerHTML = data.name;
        document.getElementById("userName").innerHTML = '@' + data.login;
        fetch(repoUrl)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            const data = res.json();

            return data;
          })
          .then((data) => {

            data.forEach(value => {
              if (value.language !== null) {
                dizi.push(value.language);

                totalsize = totalsize + value.size;
              }

            });
            document.getElementById('repoCount').innerHTML = dizi.length;
            console.log(totalsize)
            totalsize = totalsize / 1024;
            document.getElementById('codeSize').innerHTML = totalsize.toFixed(2) + ' MB';


            const firstValue = {};
            const reducer = function (obj, count) {
              if (obj[count]) {
                obj[count] = obj[count] + 1;
              } else {
                obj[count] = 1;
              }

              return obj;
            };
            const result = dizi.reduce(reducer, firstValue);
            console.log("diller: ", result);


            const diller = Object
              .entries(result)
              .forEach(dil => {

                document.getElementById("languages").innerHTML += `<div class="card">${dil[0]} ${(dil[1] / dizi.length * 100).toFixed(2)}%</div>`;
              });
          })

      })
      .catch((err) => console.log("err", err));
  }