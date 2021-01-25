---
templateKey: blog-post
title: The Math behind a Technology Radar
date: 2021-01-25T09:13:42.632Z
description: "In this Blog post I will explore the math and technologies that I
  used to build a Technology Radar with React. "
featuredpost: true
featuredimage: /img/finished-technology-radar.png
tags:
  - React
  - Technology Radar
  - JavaScript
  - Math
---
You can find my project to this blog post [here](https://github.com/DoctorBuBBle/Technology-Radar).

# Why as SVG?

We have two options how to draw our Technology Radar. As SVG or with the Canvas API. The power of the canvas API comes into play when redrawing is needed frequently. For example a browser games is redrawevery frame. Our Technology Radar, on the other hand, is only drawn once with the given properties. So our radar is rarely redrawn, which is why SVG makes more sense in our case.

# How to build the Technology Radar

In order to be able to animate each circle segment individually later on, it makes sense not to draw the rings in the Technology Radar as circles but to divide them into the individual circle segments. That means we draw each ring as a path. The rings that belong to a circle segment can then be grouped.
The path is drawn by the [d ](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d)attribute which consists of several commands, these then specify how the path should occur. With the first command M we move to the first coordinate.
For the curvature of the circle we have several options. We can draw the curvature with the [A](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#elliptical_arc_curve) command or the [C](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#cubic_b%C3%A9zier_curve) command. With C we can draw a Bézier curve. For this we specify the coordinates for two control points that define how strong the curvature should be curved. Our other option A stands for Elliptical Arc Curve. With this command you define a part of an ellipse that should be visible. A is clearly the better option in our use case because the curvature is much easier to calculate and the Bézier curve at the start and end of the curvature results in small corners. 
However, I will only discuss drawing the curvature with the Bézier Curve, since after a quick google search, you can find a [Stackoverflow](https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle#answer-18473154) article with ready-to-use code for the Elliptical Arc Curve.
But before we can discuss the curvature of the circles, how do we get to the starting point of our curvature? 

Now how do we calculate our starting point?

We want to know the x and y coordinates for our starting point. What do we know about the ring? If we divide our Technology Radar evenly into all segments we know the radian for each segment which is also the radian of our rings. If we now knew the radius, we could convert the polar coordinates into Cartesian coordinates.

# How to distribute the rings

You can distribute the rings according to the radius of the Technology Radar but this would mean that the rings that are closer to the center of the Technology Radar have less space for Technologies to place on.

For this reason I want to distribute the rings according to the area of the technology radar. First we need to know the area of the technology radar. The formula is straight forward `area = PI * r²`. 

By dividing the area of the technology radar through the number of rings we know the area that each ring has. 

```
const area = technologyRadarArea / rings.length;
```

If we multiply this with the index of the ring, we get the area of each circle that represent the ring. 

```javascript
const ringArea = (index + 1) * area;
```

For example, if each ring has an area of 50cm² on our technology radar, the ring in the center would have an area of (0 + 1)  50 *\=* 50*.* The second ring would have an area of (1 + 1)  50 = 100 and so on so forth. 

With the area of each ring we can now use the area formula to calculate the radius of each ring.

```javascript
const ringRadius = Math.sqrt(ringArea / Math.PI)
```

![Radius calculation visualized](/img/how-to-calc-ring-radius.jpg "Radius calculation visualized")

# Our Starting Point and End Point

Now we know the radius of each ring and the radian. Lets calculate the x and y coordinates for the point we start the curve and the point our curve ends. The magic formulas to convert the polar coordinate to cartesian coordinates goes like the following:

`x = radius * sin(radian)`

`y = radius * cos(radian)`

The radian for the starting point is the radian we need to travel from the start of the circle to the segment we are calculating. The radian for the end point is the radian we need to travel from the start of the circle plus the radian of the segment we are calculating the point for. 

So far so good, but the cartesian coordinate system starts with 0,0 in the center. Our SVG start with its coordinates in the upper left corner. To translate our cartesian coordinates into SVG coordinates we still need to add the x coordinate of the center and subtract the y coordinate of the center from our result. In the end our formula looks like this:

`x = center.x + radius * sin(radian)`

`y = center.y + radius * cos(radian)`

Voilá we can now calculate our start and end point.

![Start point calculation visualized](/img/how-to-calc-start-and-end-points.jpg "Start point calculation visualized")

# Bézier Curve

Now that we can calculate the start and end point of our curve, we need to calculate the curve itself.

The C command consists of three coordinates:

`C 909,7 1132,393 942,755`

The starting point for the curvature is the point we are currently at. That means if we have moved to the point 500,0 with the M command before, this is our starting point. The first coordinate is the control point of our starting point. The second coordinate is the control point for our end point. And last but not least comes the end point. 

![C command visualized](/img/how-to-draw-ring.jpg "C command visualized")

Now how do we calculate the positions of our control points? From this [Stackoverflow](https://stackoverflow.com/questions/1734745/how-to-create-circle-with-b%c3%a9zier-curves) article we can take the formula 4/3  *tan(PI / (number of segments*  2)) to find the ratio of the radius to the distance of the control points. This means the result multiplied by the radius gives us the distance from the control point to the point it controls. However, we do not know the x and y coordinates of the control point yet. Assuming the distance from the control point is the opposite side and the radius of the ring is the adjacent side of a triangle. Then we can calculate an angle and the hypotenuse which we can use as radius and radian. Radian and radius? We already know this from our start and end point. We can convert these polar coordinates into Cartesian coordinates to determine the x and y coordinates. Visualized this looks like the following:

![Control point calculation visualized](/img/how-to-calc-bezier-curve-controll-points.jpg "Control point calculation visualized")

As already mentioned, the elliptical arc curve approach is much simpler and gives a better result.

# How to position the Technologies on the radar

How you position the Technologies on the radar is in the end a question of taste. You can position them totally random or distribute them equally across their ring. I opted for something in between. I  wanted them to fill out the ring equally but still a little bit random. So I divided them equally on the radian but made the radius a random number between the radius of the last ring and the radius of the ring they are positioned in. The only exception is the center. In the center I had the problem that the technologies with a small radius would be outside because of their radian. Since this project took way longer than I wanted it to, I simply made sure that also the ring in the center had a minimum radius were this problem would not be visible.

![finished technology radar](/img/finished-technology-radar.png "finished technology radar")