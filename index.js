const app = require("express")();
const nodeHtmlToImage = require("node-html-to-image");

app.get("/", async (req, res) => {
  const { title, time, username, userPhoto } = req.query;

  const image = await nodeHtmlToImage({
    html: `
      <style>
          body{
              width: 1200px;
              height: 630px;
          }
  .thumbnail{
  	width: 1200px;
  	height: 630px;
  	background-color: #FDF9F3;
  	color: #3F3F46;
  	padding: 25px;
  	box-sizing: border-box;

  	display: flex;
  	flex-direction: column;
  	justify-content: space-between;
  }

  .title{
  	font-size: 65px;
  	margin-bottom: 0;
  }
  .date{
  	font-size: 22px;
  }

  .author{
  	display: flex;
  	align-items: center;
  }
  .author__image{
  	width: 40px;
  	height: 40px;
  	border-radius: 100%;
  	margin-right: 12px;
  }

  .author__name{
  	font-size: 22px;
  }

  .footer{
  	display: flex;
  	justify-content: space-between;
  	align-items: center;
  	padding: 0 35px;
  }

  .branding{
  	font-family: monospace;
  	font-size: 22px;
  }
      </style/>

      <div class="thumbnail">
          <div>
              <h1 class="title">${title}</h1>
              <p class="date">${time}</p>
          </div>

          <div class="footer">
              <div class="author">
                   <img class="author__image" src="${userPhoto}">
                   <p class="author__name">${username}</p>
              </div>
              <div class="branding">
                  techdiary.dev
              </div>
          </div>
      </div>
  `,
  });
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image, "binary");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Thumbnail Generator: localhost:${port}`);
});
