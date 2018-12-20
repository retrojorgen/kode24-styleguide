function initPremium(selector, rows) {
    cleanEmptyRows(() => {
        getFrontPremiumBanners( function (banners) {
        
            if(banners.length) {
                shuffleArray(banners);
                var elements = getElements(selector, rows);
                console.log(elements);
                banners.forEach((banner, index) => {
                    
                    
                    if(rows[index].type === "premium")
                        drawPremium(banner, elements[index], selector);
                    if(rows[index].type === "carousel")
                        initCarousel(elements[index]);
                });
                
            }
        })
    })
    
}

function getElements (selector, rows) {
    selector = $(selector);
    var elements = [];
    for(var x = 0; x <= rows.length-1; x++) {
        elements.push(selector.find(".row").has("*").eq(rows[x].row));
    }

    return elements;
    
}

function getItemFromArray(array, match) {
    for(let x = 0; x < array.length-1; x++) {
        if(array[x].indexOf(match) > -1) {
            return array[x].split(match)[1];
        }
    }
    return false;
}


function cleanEmptyRows (callback) {
    $(".row").each((index, row) => {
        
        if($(row).children().length < 1) {
            $(row).addClass("empty");
        }
    })

    callback();
}

function getRatio(url) {
    var props = props.split("&");
    var whRatio = getItemFromArray(props, "whRatio=");
    var whRatio = getItemFromArray(props, "whRatio=");
}

function drawPremium (banner, element, parent) {
    parent = $(parent);
    var wratio = banner.children[0].data.children.image.field.whRatio;
    var imageId = banner.children[0].data.children.image.attribute.instanceof_id;
    var cropw = banner.children[0].data.children.image.field.cropw;
    var croph = banner.children[0].data.children.image.field.croph;
    var posy = banner.children[0].data.children.image.field.y;
    var posx = banner.children[0].data.children.image.field.x;
    var kicker = banner.children[0].data.kicker;
    var url = "https://www.kode24.no" + banner.children[0].data.published_url;
    var title = banner.children[0].data.title;
    var subTitle = banner.children[0].data.subtitle;
    var titleStyles = JSON.parse(banner.children[0].data.title_style_json);
    var fontSize = titleStyles.text_size || "";
    var textAlign = titleStyles.text_align || "";
    var viewPorts = JSON.parse(banner.children[0].data.viewports_json);
    
    var imageWidth = parent.width();
    var containerWidth = imageWidth;

    var mobileViewport = JSON.parse(banner.children[0].data.children.image.field.viewports_json);
    var mobileWratio = mobileViewport.mobile.fields.whRatio;
    
    
    if(imageWidth < 500) {
        imageWidth = 600;
        wratio = mobileWratio;
        cropw = mobileViewport.mobile.fields.cropw;
        croph = mobileViewport.mobile.fields.croph;
        posx = mobileViewport.mobile.fields.x;
        posy = mobileViewport.mobile.fields.y;

    }
    var mobileFontSize = viewPorts.mobile.fields.title_style_json.text_size || "";

    var bannerElement = `

        <div class="row top-listing" style="margin-top: 20px; margin-bottom: 30px;">
            <article id="article_${banner.id}" class="preview   columns large-12 small-12 medium-12 native-advertisement" itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem" role="article" data-id="${banner.id}" data-label="">
                <a itemprop="url" href="${url}">
                    <div class="kicker">${kicker}</div> 
                    <figure id="${imageId}" style="width: ${containerWidth}px; padding-bottom: ${wratio * 100}%;">
                        <img class="" itemprop="image" alt="" src="https://dbstatic.no/${imageId}.jpg?imageId=${imageId}&x=${posx}&y=${posy}&cropw=${cropw}&croph=${croph}&width=${imageWidth}&height=${Math.round(imageWidth*wratio)}&compression=80">
                    </figure>
                    ${
                        (function () {
                            if(title && typeof title === 'string') {
                                return `
                                <div class="article-preview-text">
                                    <h1 class="headline large-size-${fontSize} text-${textAlign} small-size-${mobileFontSize}">
                                        ${title}   
                                    </h1>
                                    <p class="standfirst text-${textAlign}">${subTitle}</p>
                                    <div class="labels">
                                    </div>
                                    <span class="label-text"></span>
                                 </div>
                                
                                `
                            } else {
                                return ``;
                            }

                        })()
                    }

                </a>
            </article>
        </div>
    `;
    element.before(bannerElement);
    
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
}

function getFrontPremiumBanners ( callback ) {
    getUrl("//api.kode24.no/front/?query=id:70267311", function (data) {
        let rows = data.result[0].content["lab-dz-1"];
        if(rows.length > 1) {
            callback( rows.slice(1) );
        } else {
            callback( [] );
        }
        
	});
} 

function getUrl( url, callback ) {
    $.ajax(
        {
          type : 'GET',
          url : url,
          headers : {
          'Access-Control-Allow-Origin' : '*'
          },
          success: function (data) {
            callback(data);
          }
        }
    );
}