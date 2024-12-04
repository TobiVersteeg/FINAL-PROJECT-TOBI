# FINAL PROJECT TOBI
 This is the repository for my final project where I create a gift website.
Written and created by Tobi Versteeg.


1. Project Overview:
The purpose of my web application is to assist people in finding gift ideas. Through a category and price filter, users get an overview of gifts and are then offered more information about the gift and a link to buy it. I created this project because it is a passion project of mine and something I am working on in my free time as well. I felt that this would be the best way to put my newfound knowledge on the topic of HTML to use. 

2. Usage Guidelines
Users can interact with my application in a few ways. First of all, the filter bar on the left allows them to select a maximum of 5 filters that include hobbies or interest. Below the categories filter, the user can use the sliding bar to adjust the maximum price of the gifts. As a result of the input of the user, the overview of gifts on the right of the screen will change accordingly. The user can then use the "view gift" button to get taken to a separate page where more info on the selected gift is displayed. This page again includes an image, name, and price of the selected gift, as well as a short description. Additionally, a "link to Amazon" button is located at the bottom, which users can also interact with in order to get taken to the Amazon website to buy the product.

3. Dependencies
My project draws data from a json file that I created myself. This file contains 36 gift ideas. Unfortunately, my project is not dependent on any other external tools (more on that in the reflection).

4. Project Structure
The most important files are gifts.html (contains the outline of the filter bar), script.js (the java code that makes the categories and price filter work and function well while drawing information from the json file), styles.css (the design of the filter bar, gift boxes and all other design elements on the main page), and gifts.json (the database that contains the 36 gifts that the filters are applied on).
For the "gift-detail" page, the following files are used: gift-detail.html (contains the outline of the gift detail page, including the inclusion of the name, image, price, etc of the gift), the gift-detail.js (which contains the java code that pulls the required data per gift from the json file in a dynamic way), and the gift-detail.css file (containing the design of the "gift-detail" page).

5. Collaboration Information (if applicable)
The only person I collaborated with was Professor Li. Besides that, this is a solo project.

6. Acknowledgments
I did not use any libraries or APIs in my product (more on that in reflection). As for external resources, I used ChatGPT to help me create some of the outline for my code and to help me find mistakes in it. It was a good tool to help me find errors, and I used the knowledge from our classes to correct those.

7. Reflection
I had a lot of fun working on this project and thinking about the possible implementations, although I think I could have created a more detailed and complicated web application by implementing fastapi and other apis. Learning about computer science opened me up to many possibilities. Learning about coding this semester had benefitted me greatly because I now look at code and mostly know what is going on and what line of code leads to what output. 

One of my biggest challenges was creating a separate "detailed gift" page for each individual gift. It took me some time to figure out that I had to give "id" numbers to each gift in the json file. It was quite a relief when I discovered this and it finally worked. Furthermore, another struggle was getting the gift boxes to fit and have a nice looking format. This was mostly a case of trial and error in adjusting the .css files. I can proudly say that I made this work in the end.

The biggest regret I have is working on the assignment without reading through the instructions clearly. I just started working on what felt right and important to me, and it was only later that I found out there were certain requirements I had to meet, like including fastapi, python, and an external api. Besides the fact that these were requirements and will affect my grade, I also think that my website would have been way better functioning and looking if I implemented these requirements.

During future projects, I know that I must implement more external resources, api, as well as python and possibly genAI in order to create a better and perhaps smoother running website. That being said, I am very proud of what I have achieved using only html, java, and css, and I know that what I have created will help me further build out my personal website.

During the process of creating this project, I sometimes used chatGPT as a helping tool to make me better understand the code. During homework assignments, I soon learned that code created by chatGPT is not very reliable, but that it can be good at pointing out mistakes. From this I have concluded that chatGPT can best be used as a coding assistant, not as a code writer, and this is mostly how I used it during this project. However, I realized that genAI will improve in the future, and therefore I will keep my eye on the developments.

During this semester, I went from someone who knew nearly nothing about anything related to coding, to someone who built their own website. Of that achievement, I am very proud. I find coding itself pretty hard to do still, but at least I understand it now and can read most of it. I will continue to build my knowledge from here and look forward to doing so!

I see this project of the start of something rather than the end of the semester. I will continue to work on this project and eventually implement it into my own website. I will keep you updated on my progress, I look forward to sharing it with you.

Thank you for everything you taught me, I hope we will stay in touch!