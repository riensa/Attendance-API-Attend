exports.info = async (req, res) => {
	try {
		return res.send({
			status: 200,
			success: true,
			message: "Fetch Profile Info Successfully",
			data: {}
		})

	} catch (error) {
		return res.status(500).send({
			status: 500,
			success: false,
			message: "Unexpected Error",
			errors: error.message || "Some error occurred"
		});
	}
}