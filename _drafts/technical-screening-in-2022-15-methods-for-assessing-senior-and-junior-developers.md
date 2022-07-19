---
date: 2022-07-19 19:10:41 +0000
author: matt-brennan
categories: []
title: 'Slack Profile Avatar '
description: 'Last week our marketing director wanted to get a list of people who
  haven’t yet '
image: "/uploads/screeningdevelopers_header.jpg"
thumbnail: "/uploads/screeningdevelopers_thumb.jpg"
color_overlay: "#264083"
featured: true
type: ''

---
At Esteemed, we’re _very_ interested in building a community amongst our peers. Our goal is to get to know our colleagues as well as we possibly can, so that we can market them in the best way possible, while also providing our clientele with the confidence of high quality talent.

Last week our marketing director wanted to get a list of people who haven’t yet uploaded an image of their smiling faces. Easy enough, I thought. Having already worked extensively with Slack’s API, I thought that surely I would be able to filter users by a flag within the user objects.

[https://api.slack.com/methods/users.list](https://api.slack.com/methods/users.list "https://api.slack.com/methods/users.list")

Within the user.profile object you can easily see links to the variations of the user’s avatar. However, it appears that even if a user neglects adding their profile image, Slack will helpfully look for their email addresses’s associated Gravatar, or provide them with an image showcasing the letter of their first name. Not helpful.

At this point I was concerned that I had hit a dead-end. However, I got to thinking… we now have some amazingly talented people who have trained AI models to detect faces. Is that something we could utilize here? After asking our community and doing a little bit of research, I discovered this handy node module-

[https://www.npmjs.com/package/face-api.js](https://www.npmjs.com/package/face-api.js "https://www.npmjs.com/package/face-api.js")

Now we’re cooking. So, first I retrieved a list of the user IDs and associated avatars via the aforementioned users.lists Slack endpoint. I now had an array of objects with a link to each avatar. I then put together the following code-

    users.filter(u => {
        const img = await canvas.loadImage(u.image);
        const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);
        return detections.length == 0;
      });

However, as some of you keen readers at home may already be aware, you cannot run asynchronous operations within Array.prototype.filter(). Further, as I would later find out, doing it this way would quickly get you blocked via Slack’s API rate limiting. So, I switched to doing it to the ol’ fashioned synchronous way:

    let usersWithoutAvatars = []
    
    for (let i = 0; i < users.length; i++) {
      const img = await canvas.loadImage(users[i].image);
      const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);
      if (detections.length == 0) usersWithoutAvatars.push(data[i]);
    }
    

Alright, almost there! We now have a beautiful list of all the users who we need. I then used fs to write the output to a CSV file. From there, I imported that dataset into gSheets to share with our marketing director. This is all well and good, but we now needed a quick way to visualize and possible false-positives from the face-api call. Armed with just a spreadsheet full of over 900 links, this would have taken hours! 

Luckily, Google Sheets has the following handy formula: 

    =Arrayformula(image(<cell>))

Adding this formula to the column following the URL, we now magically had a rendered copy of the linked image directly within the gSheet! Applying that same formula to the rest of the column netted us the results we’re looking for. We now quickly could go through and identify the false-positives, compile a list of users, and connect and request (kindly) that they update their avatars.