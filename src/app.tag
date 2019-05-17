<app>
	<router>
			<route path="sign-in">
				<p>Sign-in</p>
				<script>
					import queryString from 'query-string';
					console.log(queryString.parse(window.location.hash.replace(
						"sign-in", ""
					).replace(
						"?", ""
					)));
				</script>
			</route>
			<route path="">
				<p>Homepage</p>
			</route>
	</router>
</app>
