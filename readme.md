 ## <h1>Url Shortner </h1>
 Takes long url in input and genrates short url, there are more than one methods to encode, some of the methods are implemented in code as well. See white board diagram of [System Design](https://app.eraser.io/workspace/WT8cqvcIo0eTOKoVaQrM?origin=share)  for better understanding.

## <h2>What's this project about? </h2>
1. Make a `post` request in `localhost:8000/url` with `{"url":"<your long url link to redirect>"}`

2. Above step will response like this `{"short-url":"ZRk9z1S"}`. note this short-url.

3. Make a get request `http://localhost:8000/<short-url>` , now this will rediect to `<your long url link to redirect>` .

4. You can accesss this short url `http://localhost:8000/<short-url>` .

## Pre-requisite
1. Node Installed.
2. MongoDb Installed or uisng `MongoDb Atlas cluster`. 
3. `Mongoose` Installed.
4. `Postman API` Installed.
5. Any favourite IDE installed.

## <h2> Tech Stack </h2>
 1. NodeJs
 2. MongoDb
 3. Mongoose
 4. Zookeeper
 
 ## Instructions to run this project
 1. Make `.env` file and add
  ```bash
   CREDENTIAL_MONGO=mongodb+srv://<username>:<password>@cluster0.yzhaeoz.mongodb.net/<name-of-db>?retryWrites=true&w=majority
   ```
2. Install all dependencies `npm install` and run the project `npm start`.
## <h1> System Design </h1>
![System Architecture](/url-shortner.png "Architecture of url shortner")
<h3> See the white-board diagram </h3>

<b> [Open to view System Design](https://app.eraser.io/workspace/WT8cqvcIo0eTOKoVaQrM?origin=share) </b>

## <h1>Encoding Methods(Discussed General Pros & Cons) </h1>
<h2>1. <b> Base62Encoding </b> </h2>

```javaScript

 const Base62 = (x) => {
    let number = x;
    let reminder = [];
    let codes = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ];
    //console.log(codes[45])
    while (number >= 62) {
        reminder.push(number % 62);
        number = Math.floor(number / 62);
    }

    number = codes[number];
    while (reminder.length > 0) {
        number += codes[reminder.pop()]
    }
    return number;
}

console.log(Base62(3521614606207)); //ZZZZZZZ maximum 7 digit value expressed in 62 digit
```
<h2> <b>2. Message-digest algorithm( MD5) </br></b> </h2>
 <h4> MD5 was developed as an improvement of MD4, with advanced security purposes. The output of MD5 (Digest size) is always 128 bits. MD5 was developed in 1991 by Ronald Rivest. </h4>
 <h3> Use Of MD5 Algorithm: </h3>
 <h4>1. It is used for file authentication. </br>
2. In a web application, it is used for security purposes. e.g. Secure password of users etc. </br>
3. Using this algorithm, We can store our password in 128 bits format.  </h4>

``` javaScript
// Message Digest 4 Steps
// 1. Append Padding List
// 2. Append 64 bit Representation
// 3. Initialize MD Buffer -buffer size 32
// Process Each Block
// eg. let's take message= 1000 bits
// 512*2= 1024, 512*3= 1536, 512*4=2048, so on..
// 1536- 64= 1472=> 1000(mesaage) + 472
// 1472+ 64 = 1536(exaclt multiple of 512)
// MD of 1536 creation => bloock-1(512), block-2(512), block-3(512),

const md5 = (str) => {
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
    }

    var s = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
        5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
        4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
        6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ];
    var K = [];
    for (var i = 0; i < 64; ++i) {
        K.push(Math.floor(Math.abs(Math.sin(i + 1)) * Math.pow(2, 32)));
    }

    var a = 0x67452301;
    var b = 0xefcdab89;
    var c = 0x98badcfe;
    var d = 0x10325476;

  
    for (var i = 0; i < bytes.length; i += 64) {
        var AA = a;
        var BB = b;
        var CC = c;
        var DD = d;

        for (var j = 0; j < 64; ++j) {
            var F, g;
            if (j < 16) {
                F = (b & c) | ((~b) & d);
                g = j;
            } else if (j < 32) {
                F = (d & b) | ((~d) & c);
                g = (5 * j + 1) % 16;
            } else if (j < 48) {
                F = b ^ c ^ d;
                g = (3 * j + 5) % 16;
            } else {
                F = c ^ (b | (~d));
                g = (7 * j) % 16;
            }
            var temp = d;
            d = c;
            c = b;
            b = b + leftRotate((a + F + K[j] + bytes[i + g]), s[j]);
            a = temp;
        }

        a += AA;
        b += BB;
        c += CC;
        d += DD;
    }

  
    function toHex(n) {
        var hexChars = "0123456789abcdef";
        var result = "";
        for (var i = 0; i < 4; ++i) {
            result += hexChars.charAt((n >> (i * 8 + 4)) & 0xF) +
                hexChars.charAt((n >> (i * 8)) & 0xF);
        }
        return result;
    }

    return toHex(a) + toHex(b) + toHex(c) + toHex(d);
}


function leftRotate(x, c) {
    return (x << c) | (x >>> (32 - c));

}
console.log(md5("AShish"))
```
<h2>Application Of MD5 Algorithm:</h2>
We use message digest to verify the integrity of files/ authenticates files.
MD5 was used for data security and encryption.
It is used to Digest the message of any size and also used for Password verification.
For Game Boards and Graphics.
<h2>Advantages of MD5 Algorithm:</h2>
MD5 is faster and simple to understand.
MD5 algorithm generates a strong password in 16 bytes format. All developers like web developers etc use the MD5 algorithm to secure the password of users. 
To integrate the MD5 algorithm, relatively low memory is necessary. 
It is very easy and faster to generate a digest message of the original message.
<h2>Disadvantages of MD5 Algorithm: </h2>
MD5 generates the same hash function for different inputs. 
MD5 provides poor security over SHA1.
MD5 has been considered an insecure algorithm. So now we are using SHA256 instead of MD5  
MD5 is neither a symmetric nor asymmetric algorithm.

<h1>3. Using Counter Approach </h1>
Using a counter is a good decision for a scalable solution because counters always get incremented so we can get a new value for every new request. 

##  <h1> Distributed Coordination Service </h1>
Zookeeper is basically a distributed coordination service that manages a large set of hosts. It keeps track of all the things such as the naming of the servers, active servers, dead servers, and configuration information of all the hosts. It provides coordination and maintains the synchronization between the multiple servers.
## <h1> Load Balancer </h1>
To handle a large number of requests, we can use a load balancer to distribute incoming traffic across multiple instances of the application server. We can add a Load balancing layer at three places in our service:

1. Between Clients and Application servers.
2. Between Application Servers and database servers.
3. Between Application Servers and Cache servers.


## Refrences
[Zookeper with Kafka](https://dattell.com/data-architecture-blog/what-is-zookeeper-how-does-it-support-kafka/) </br>
[Working with Mongoose and MongoDb](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)


©  All rights are reserved! </br>
Author - Aashish Kumar Singh. </br> 
[linkedin](https://www.linkedin.com/in/aashish-kumar-singh-499241164/) </br>
[portfolio-website](https://ashdude14-github-io-git-main-ashdude14s-projects.vercel.app/) </br>
[e-mail](mailto:ashish.kumar.singh.jee@gmail.com)