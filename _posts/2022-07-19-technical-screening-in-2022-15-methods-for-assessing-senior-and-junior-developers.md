---
date: 2022-07-19T19:10:41.000+00:00
author: albert-volkman
categories: []
title: Using Face Detection with Tensorflow.js to Find Avatars Missing a Face
description: Combining Tensorflow.js, Slack APIs, and a little bit of code-magic,
  we were able to determine which members were using profile pictures and which weren't.
image: "/uploads/slack-tensorflow-js-header.jpg"
thumbnail: "/uploads/slack-tensorflow-js.jpg"
color_overlay: "#264083"
featured: false
type: ''

---
At Esteemed, we’re passionate about building community amongst our peers. One of our goals is to get to know our colleagues as well as we possibly can, so that we can market them in the best way possible and offer our clientele with the confidence of high-quality talent.

A way we try to foster community and connection among clients and members is through the use of voluntary profile images in our platform. 

We believe it's nice to see each other face-to-face, and remind one another that there is a human on the other side of the comment, chat, or thread. 

Sometimes our members forget to upload a photo, and recently we wanted to audit which profiles in our platform did not have profile images. 

I've worked extensively with Slack's API, so I thought surely I could filter users by a flag within the [user objects](https://api.slack.com/methods/users.list "https://api.slack.com/methods/users.list"). 

Within the **user.profile** object you can easily see links to the variations of the user’s avatar. As a default or fall-back to a user with an empty profile photo, Slack will search for the Gravatar associated with their email, or provide an image showcasing the letter of their first name. 

An image of a letter isn't a great reference image for other members or clients to get to know who they are talking to. At this stage, we knew who did or didn't have images, but no way to automate the process of filtering between faces and non-faces so we could follow up and see if anyone could update their image. 

With over 1,500 members, the sifting of faces and non-faces would be no small task! At this point, I was concerned that I had hit a dead-end. However, I got to thinking… we now have some amazingly talented people who have trained AI models to detect faces. Is that something we could utilize here? After asking our community and doing a little bit of research, I discovered [this handy node module](https://www.npmjs.com/package/face-api.js).

With the module, I could retrieve a list of the user IDs and associated avatars via the aforementioned **users.lists** Slack endpoint. I now had an array of objects with a link to each avatar. I then put together the following code:

    users.filter(u => {
        const img = await canvas.loadImage(u.image);
        const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);
        return detections.length == 0;
      });

However, you cannot run asynchronous operations within **Array.prototype.filter()**. Further, as I would later find out, doing it this way would quickly get you blocked via Slack’s API rate limiting. So, I switched to doing it to the ol’ fashioned synchronous way:

    let usersWithoutAvatars = []
    
    for (let i = 0; i < users.length; i++) {
      const img = await canvas.loadImage(users[i].image);
      const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);
      if (detections.length == 0) usersWithoutAvatars.push(data[i]);
    }
    

Alright, almost there! We now have a beautiful list of all the users who we need. I then used **fs** to write the output to a CSV file. From there, I imported that dataset into Google Sheets to view. 

We  needed a quick way to visualize and test possible false-positives from the **face-api** call. Armed with just a spreadsheet full of over 900 links, this would have taken hours! 

Luckily, Google Sheets has the following handy formula: 

    =Arrayformula(image(<cell>))

Adding this formula to the column following the URL, we now magically had a rendered copy of the linked image directly within the Google Sheet! Applying that same formula to the rest of the column provided us with the results we were looking for. We could now rifle through the list and identify the false-positives, compile a list of users, and connect and request that they update their avatars from the default Slack image to a picture of their smiling face.

If you're managing a remote community, or looking for more integration of technology and relationship-building, reach out to us for more information!