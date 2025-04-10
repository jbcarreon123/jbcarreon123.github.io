<script lang="ts">
	// import type Freezeframe from 'freezeframe';
	// import { onMount } from 'svelte';

	// let fre: Freezeframe;

	// onMount(async () => {
	// 	let f = await import('freezeframe');
	// 	let freezeframe = f.default;

	// 	fre = new freezeframe('.buttons', {
	// 		responsive: false,
	// 		trigger: false,
	// 		warnings: false
	// 	});
	// });
</script>

<!-- <div class="flex justify-center pb-2">
	<button class="border" onclick={() => fre.toggle()}>Play/Pause Animated Buttons</button>
</div> -->
<div class="btn-container">
	<a
		target="_blank"
		rel="noopener"
		class="w-fit shrink-0"
		href="https://dimden.dev/"
		><img
			src="https://dimden.dev/services/images/88x31.gif"
			loading="lazy"
			title="Dimden's Hotel"
			alt="Dimden's Hotel"
		/></a
	>
	<a
		target="_blank"
		rel="noopener"
		class="w-fit shrink-0"
		href="https://nekoweb.org/"
		><img
			src="https://nekoweb.org/assets/buttons/button5.gif"
			loading="lazy"
			title="Nekoweb (button by maxpixels)"
			alt="Nekoweb (button by maxpixels)"
		/></a
	>
	<a
		target="_blank"
		rel="noopener"
		class="w-fit shrink-0"
		href="https://status.cafe"
		><img
			src="https://status.cafe/assets/button.png"
			loading="lazy"
			title="Status Cafe"
			alt="Status Cafe"
		/></a
	>
	<a
		target="_blank"
		rel="noopener"
		class="w-fit shrink-0"
		href="https://thinliquid.dev"
		><img
			src="https://thinliquid.dev/thnlqd.png"
			loading="lazy"
			title="thinliquid's button"
			alt="thinliquid's button"
		/></a
	>
	<a
		target="_blank"
		rel="noopener"
		class="w-fit shrink-0"
		href="https://rice.place/"
		><img
			src="https://rice.nekoweb.org/button/ricenodot.png"
			loading="lazy"
			title="rice.place"
			alt="rice.place"
		/></a
	>
	<a
		target="_blank"
		rel="noopener"
		class="w-fit shrink-0"
		href="https://darkosparko.nekoweb.org/"
		><img
			src="https://darkosparko.nekoweb.org/rocket-button.gif"
			loading="lazy"
			title="darkosparko/Spark-Web: Rocket into the Spark-web!"
			alt="darkosparko/Spark-Web: Rocket into the Spark-web!"
		/></a
	>
	<a target="_blank" rel="noopener" href="https://max.nekoweb.org/"
		><img
			src="https://max.nekoweb.org/images/button.gif"
			loading="lazy"
			title="maxpixels: max's apartment"
			alt="maxpixels: max's apartment"
		/></a
	>
	<a target="_blank" rel="noopener" href="https://ddnikki.nekoweb.org"
		><img
			src="https://ddnikki.nekoweb.org/images/nikkibutton.gif"
			loading="lazy"
			title="DDNikki"
			alt="DDNikki"
		/></a
	>
	<a target="_blank" rel="noopener" href="https://drfred.nekoweb.org/"
		><img
			src="https://drfred.nekoweb.org/collection/buttons/sites/button-drfred.png"
			loading="lazy"
			title="Dr. Fred: Enter the Fredzone..."
			alt="Dr. Fred: Enter the Fredzone..."
		/></a
	>
	<a target="_blank" rel="noopener" href="https://ultrakill.nekoweb.org"
		><img
			src="https://ultrakill.nekoweb.org/awawawawa.png"
			loading="lazy"
			title="Sol/Ultrakill: click for a FREE gabriel plushie!"
			alt="Sol/Ultrakill: click for a FREE gabriel plushie!"
		/></a
	>
	<a target="_blank" rel="noopener" href="https://july.lol"
		><img
			src="https://july.lol/img/lonelyjulybutton.gif"
			title="july.lol"
			alt="july.lol"
			loading="lazy"
		/></a
	>
	<a target="_blank" rel="noopener" href="https://mechagic.party/"
		><img
			src="https://mechagic.party/2images/1button.webp"
			loading="lazy"
			title="Mechagic's Fun Button"
			alt="Mechagic's Fun Button"
		/></a
	>
	<a target="_blank" rel="noopener" href="https://joo.sh/"
		><img
			src="https://files.joo.sh/img/buttons/jooshRice.gif"
			title="joo.sh"
			alt="joo.sh"
			loading="lazy"
		/></a
	>
	<a target="_blank" rel="noopener" href="https://layercake.nekoweb.org/"
		><img
			src="https://files.catbox.moe/h7nelz.gif"
			title="Layercake"
			alt="Layercake"
			loading="lazy"
		/></a
	>
	<a
		href="https://beaus-silly-folder.nekoweb.org"
		target="_blank"
		rel="noopener"
		class="links"
		><img
			src="https://beaus-silly-folder.nekoweb.org/BSF.gif"
			title="Beau's Silly Folder"
			alt="Beau's Silly Folder"
			loading="lazy"
		/></a
	>
	<!-- <a href="https://xan.lol"><img src="https://xan.lol/button.avif" ></a> -->
	<a href="https://toasty.place/" target="_blank" rel="noopener"
		><img
			src="https://toastofthesewn.nekoweb.org/images/buttons/pagebutton1.gif"
			loading="lazy"
			title="ToastofTheSewn"
			alt="ToastofTheSewn"
		/></a
	>
	<a href="https://biofreak.world" target="_blank" rel="noopener"
		><img
			src="https://softatrocity.nekoweb.org/sitebuttons/biofreak-dark.png"
			loading="lazy"
			title="biofreak.world"
			alt="biofreak.world"
		/></a
	>
	<a href="https://amoebalous.net/" target="_blank"
		><img
			src="https://amoebalous.net/images/buttons/amoebalous.png"
			title="amoebalous.net"
			alt="amoebalous.net"
			loading="lazy"
		/></a
	>
	<a href="https://modularity.nekoweb.org/" target="_blank"
		><img
			src="https://modularity.nekoweb.org/mdlr.gif"
			title="modularity"
			alt="modularity"
			loading="lazy"
		/></a
	>
	<a href="https://bang1338.nekoweb.org" target="_blank"
		><img
			src="https://bang1338.nekoweb.org/bang1338.gif"
			title="Bang1338"
			alt="Bang1338"
			loading="lazy"
		/></a
	>
	<a href="https://bntarwarn.com/" target="_blank"
		><img
			src="https://bntarwarn.com/zz_img/buttons/bntarwarn.png"
			title="BNTarwarn"
			alt="BNTarwarn"
			loading="lazy"
		/></a
	>
	<a href="https://xan.lol/" target="_blank"
		><img
			src="https://xan.lol/img/btn/meta.gif"
			title="Xan Surnamehere"
			alt="Xan Surnamehere"
			loading="lazy"
		/></a
	>
	<a href="https://metakabe.nekoweb.org/" target="_blank">
		<img
			src="https://metakabe.nekoweb.org/Buttons/kabebutton.gif"
			loading="lazy"
			title="metakabe^^"
			alt="metakabe^^"
		/>
	</a>
	<a href="https://ethxn.xyz/" target="_blank"
		><img
			src="/imgs/buttons/ethxn-button.gif"
			loading="lazy"
			title="ethxn"
			alt="ethxn"
		/></a
	>
	<a href="https://chataigne.nekoweb.org/" target="_blank"
		><img
			src="https://chataigne.nekoweb.org/button1.jpg"
			loading="lazy"
			title="Chataigne Online"
			alt="Chataigne Online"
		/></a
	>
	<a href="https://avrelsleepy.nekoweb.org/" target="_blank"
		><img
			src="https://avrelsleepy.nekoweb.org/assets/webbuttons/avrel.png"
			title="avrelsleepy"
			alt="avrelsleepy"
			loading="lazy"
		/></a
	>
	<a href="https://exclave.city/" target="_blank"
		><img
			src="https://exclave.city/images/button1.gif"
			title="Whey Isolate: Explore Exclave"
			alt="Whey Isolate: Explore Exclave"
			loading="lazy"
		/></a
	>
	<a href="https://reduxflakes.nekoweb.org/" target="_blank"
		><img
			src="https://reduxflakes.nekoweb.org/public/img/buttons/reduc_anim.gif"
			title="ReduxFlakes"
			alt="ReduxFlakes"
			loading="lazy"
		/></a
	>
	<a href="https://libraryofgurkistan.nekoweb.org/" target="_blank"
		><img
			src="/imgs/buttons/hellomortal.png"
			title="LibraryofGurkistan: HELLO MORTAL"
			alt="LibraryofGurkistan: HELLO MORTAL"
			loading="lazy"
		/></a
	>
	<a href="https://ducdat0507.github.io/" target="_blank"
		><img
			src="/imgs/buttons/duducat.svg"
			title="duducat's corner on the interwebz!"
			alt="duducat's corner on the interwebz!"
			loading="lazy"
		/></a
	>
	<a href="https://theoliveoli.nekoweb.org/" target="_blank"
		><img
			src="/imgs/buttons/theoliveoli.png"
			width="88px"
			height="31px"
			title="TheOliveOli"
			alt="TheOliveOli"
			loading="lazy"
		/></a
	>
	<a href="https://yumeoi.skin/" target="_blank"
		><img
			src="/imgs/buttons/yumeo.gif"
			width="88px"
			height="31px"
			title="yumeoi.skin"
			alt="yumeoi.skin"
			loading="lazy"
		/></a
	>
	<a href="https://eyeorb.net/" target="_blank"
		><img
			src="https://eyeorb.net/site_button.gif"
			width="88px"
			height="31px"
			title="eyeorb.net"
			alt="eyeorb.net"
			loading="lazy"
		/></a
	>
	<a href="https://thepersonever.net/" target="_blank"
		><img
			src="https://thepersonever.net/thepersoneverbutton.gif"
			title="thepersonever"
			alt="thepersonever"
			loading="lazy"
		/></a
	>
	<a href="https://aoki553.nekoweb.org/" target="_blank"
		><img
			src="https://aoki553.neocities.org/nekoweb/deco/aoki553button.gif"
			title="aoki553"
			alt="aoki553"
			loading="lazy"
		/></a
	>
	<a href="https://satorikeiko.nekoweb.org/" target="_blank"
		><img
			src="/imgs/buttons/satorikeiko.png"
			title="Satorikeiko"
			alt="Satorikeiko"
			loading="lazy"
		/></a
	>
	<a href="https://ceat.nekoweb.org/" target="_blank"
		><img
			src="https://ceat.nekoweb.org/img/badges/badge.png"
			title="ceat"
			alt="ceat"
			loading="lazy"
		/></a
	>
	<a href="https://ivrry.nekoweb.org/" target="_blank"
		><img
			src="https://ivrry.nekoweb.org/assets/images/button.png"
			title="ivrry"
			alt="ivrry"
			loading="lazy"
		/></a
	>
	<a href="https://raccoonbutt.com/" target="_blank"
		><img
			src="https://raccoonbutt.com/static/images/button.gif"
			title="raccoonbutt.com"
			alt="raccoonbutt.com"
			loading="lazy"
		/></a
	>
	<a href="https://olivia.nekoweb.org/" target="_blank"
		><img
			src="https://olivia.nekoweb.org/images/badge.png"
			title="Liv site"
			alt="Liv site"
			loading="lazy"
		/></a
	>
	<a class="w-fit shrink-0" href="https://nandraid.moe" target="_blank">
		<img
			src="/imgs/buttons/nandraid.gif"
			title="Randopaizer/Nandraid"
			alt="Randopaizer/Nandraid"
			loading="lazy"
		/>
	</a>
	<a target="_blank" class="w-fit shrink-0" href="https://lel.nekoweb.org">
		<img
			decoding="async"
			loading="lazy"
			src="/imgs/buttons/lel@Button.png"
			title="lel@button"
			alt="lel@nekoweb button"
		/>
	</a>
	<a href="https://strudelfatpaws.neocities.org" target="_blank"
		><img
			src="https://strudelfatpaws.neocities.org/badge.gif"
			loading="lazy"
			title="strudel fatpaws"
			alt="strudelfatpaws"
		/></a
	>
	<a href="https://arataka.neocities.org" target="_blank"
		><img
			src="https://arataka.neocities.org/image/88by31.gif"
			loading="lazy"
			alt="arataka"
			title="arataka"
		/></a
	>
	<a href="https://luxfero.nekoweb.org/" target="_blank">
		<img
			src="https://luxfero.nekoweb.org/buttons/lux_fero.gif"
			loading="lazy"
			alt="Lux Fero"
			title="Lux_Fero"
		/>
	</a>
	<a href="https://metatronius.net" target="_blank"
		><img
			src="https://metatronius.net/buttons/2.png"
			loading="lazy"
			alt="metatronius"
			title="metatronius"
		/></a
	>
	<a href="https://tsukinio.nekoweb.org" target="_blank"
		><img
			src="/imgs/buttons/tsukinio.gif"
			loading="lazy"
			alt="tsukinio"
			title="Tsukinio:: Chiikawa Edition"
		/></a
	>
	<a href="https://medjed.nekoweb.org/" target="_blank">
		<img
			src="https://medjed.nekoweb.org/assets/images/button.jpg"
			loading="lazy"
			alt="Medjed"
			title="Medjed"
		/>
	</a>
	<a href="https://remblanc.com" target="_blank"
		><img
			src="https://remblanc.com/images/button.png"
			alt="remblanc"
			loading="lazy"
			title="remblanc: the owner of this button's website dares anyone copypasting this button link to keep this wacky title or come up with a different title of proportionate wackiness"
		/></a
	>
</div>

<style>
	img {
		position: relative;
		image-rendering: pixelated;
		z-index: 2;

		width: 88px;
		height: 31px;
		overflow: hidden;
	}

	a :global {
		.ff-loading-icon::before {
			background-image: none;
			content: "Loading";
			overflow: hidden;

			width: 88px;
			height: 31px;

			margin: 0 auto;
		}
	}

	img:hover {
		z-index: 5;
		transform: scale(1.25);
		filter: blur(0);
	}

	.btn-container:has(img:hover) img:not(:hover) {
		z-index: 1;
		opacity: 0.5;
		filter: blur(2px);
	}
</style>
