<?php
    require_once('header.php');
?>
<script src='ProjectPage.js'></script>
<div class='textbox-wrapper'>
    <h2 class='textbox-title'>
        My Projects
    </h2>
    <div class='textbox-content' style='width:70%'>
        I firmly believe that it is best to learn by doing. I have taken a handful of computer science classes in the past and, while
        useful, none of them have taught me as much as the projects I've worked on. So, here is a selection of projects I've worked on,
        both for work and for fun.
    </div>
</div>
<?php
    $brightsoundData = array(
        'coverImage'    =>  "/Images/brightsound_main_alt.png",
        'title'         =>  "Brightsound",
        'story'         =>  "When I started this project, I had no experience with Unity, C#, or game design. After working with my friends over a weekend, 
                            I learned the skills needed to contribute to my group's success.
                            <br />
                            <br />
                            more words later",
        'innerImage'    =>  "/Images/thumbnails/tn_brightsound_inner3.png",
        'description'   =>  "Brightsound is a 2D puzzle platformer originally developed in 48 hours for the 2017 Global Game Jam. It was further
                            developed over a period of several months and submitted to IEEE Gamesig 2017, where it earned the rank of
                            semifinalist.",
        'extraInfo'     =>  "Download the IEEE build 
                            <a href='https://pgtruong.itch.io/brightsound' target='_blank'>here</a>
                            <br />
                            Download the original GGJ build 
                            <a href='https://globalgamejam.org/2017/games/brightsound' target='_blank'>here</a>",
        'border'        =>  'black'
    );
    $mjbData = array(
        'coverImage'    =>  "/Images/mjb.png",
        'title'         =>  "Metal Jewelry Blanks",
        'story'         =>  "This was my first project as a professional web developer at Oblouk, LLC.",
        'innerImage'    =>  "/Images/mjb_inner.png",
        'description'   =>  "Metal Jewelry Blanks is a store through which customers can upload designs and purchase customized metal blanks.
                            it is built on the Shopify platform.",
        'extraInfo'     =>  "Metal Jewelry Blanks can be found 
                            <a href='https://www.metaljewelryblanks.com' target='_blank'>here</a>",
        'border'        =>  'black'
    );
    $openA401kData = array(
        'coverImage'    =>  "/Images/401k.png",
        'title'         =>  "openA401k",
        'story'         =>  "This was my second project at Oblouk, LLC.",
        'innerImage'    =>  "/Images/401k_inner.png",
        'description'   =>  "openA401k is a service which allows users to quickly and easily fill out solo 401k forms.",
        'extraInfo'     =>  "openA401k can be found 
                            <a href='http://www.opena401k.com' target='_blank'>here</a>",
        'border'        =>  'green'
    );
    ?>
    <?php
    createSlidingPanel($brightsoundData);
    createSlidingPanel($openA401kData);
    createSlidingPanel($mjbData);

    function createSlidingPanel($data)
    {
        echo "
            <div class='sliding-panel sliding-panel--closed' style='border: 2px solid $data[border]; background: $data[border]'>
                <div class='sliding-panel__outer-page'>
                    <div class='sliding-panel__content'>
                        <div class='project-image-wrapper center-vertical'>
                            <image class='project-image' src='$data[coverImage]'></image>
                        </div>
                    </div>
                </div>
                <div class='sliding-panel__inner-page'>
                    <div class='sliding-panel__content'>
                        <div class='project-description'>
                            <h1>$data[title]</h1>
                            <br />
                            $data[story]
                        </div>
                        <div class='project-image-wrapper'>
                            <image class='project-image' src='$data[innerImage]'></image>
                            <div class='project-extra-info'>
                                <i>
                                    $data[description]
                                </i>
                                <br />
                                <br />
                                $data[extraInfo]
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ";
    }

    require_once('footer.php');