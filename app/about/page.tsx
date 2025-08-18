import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
			<div className="w-full py-8">
				<div className="max-w-2xl mx-auto px-4">
					<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
						<CardContent className="p-6 space-y-4">
							<p>
								Plant Species Identifier is a smart and easy-to-use tool that helps you recognize plants instantly. Simply upload a photo or capture one using your camera, and within seconds you’ll discover detailed information about the species in front of you. Whether it’s a flower in your garden, a tree on the roadside, or a plant you’ve spotted while hiking, our tool makes identification simple and reliable.</p>
							<p>
								The goal of Plant Species Identifier is not only to help users recognize plants but also to encourage a deeper connection with nature. Plants play a vital role in maintaining balance in our environment, and learning about them helps us appreciate their importance even more. By offering quick access to plant details, this platform inspires curiosity and awareness about the world of biodiversity that surrounds us.
							</p>
							<p>
								This tool is designed for everyone — from students and researchers to gardeners, travelers, and casual explorers. It allows you to carry a “digital plant guide” right in your pocket, so you never have to wonder about the species you encounter. With its user-friendly design and mobile-friendly camera support, exploring and identifying plants becomes a fun and engaging experience.
							</p>
							<p>
								Plant Species Identifier is more than just a recognition tool; it is your companion for discovery. Whether you are on a nature walk, working on a school project, or simply curious about the plants in your neighborhood, it empowers you to learn, explore, and stay connected to the natural world.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
} 