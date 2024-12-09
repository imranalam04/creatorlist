import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/app/components/Chart";
import SectionBox from "@/app/components/layout/SectionBox";
import connectToDatabase from "@/app/connect";
import { Event } from "@/app/models/Event";
import { Page } from "@/app/models/Page";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { FaLink } from "react-icons/fa";
import { formatISO9075 } from "date-fns";

export default async function AnalyticsPage() {
    await connectToDatabase()
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect('/')
    }
    const page = await Page.findOne({ owner: session.user.email })
    // const viewsCount = await Event.countDocuments({ type: 'view', uri: page.uri })
    // const clickCount = await Event.countDocuments({ type: 'click', uri:page.links.map(l => l.url) })

    const groupedViews = await Event.aggregate([
        {
            '$match': {
                type: 'view',
                uri: page.uri
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        date: "$createdAt",
                        format: "%Y-%m-%d"
                    }
                },
                count: {
                    "$count": {}
                }
            }
        }
    ], { $order: '-_id' })


    const clicks = await Event.find({
        page: page.uri,
        type: 'click'
    })


    return (
        <div>
            <SectionBox>
                <h2 className="text-xl mb-6 text-center">Views</h2>
                <div className="flex justify-center items-center">
                    <Chart data={groupedViews.map(o => ({
                        'date': o._id,
                        'views': o.count
                    }))} />
                </div>

            </SectionBox>
            <SectionBox>
                <h2 className="text-xl mb-6 text-center">Clicks</h2>
                {page.links.map(link => (
                    <div key={link.title} className="md:flex gap-4 items-center border-t border-gray-200 py-4">
                        <div className="text-blue-500 pl-4">
                            <FaLink />
                        </div>
                        <div className="grow">
                            <h3>{link.title || 'no title'}</h3>
                            <p className="text-gray-700 text-sm">{link.subtitle || 'no description'}</p>
                            <a className="text-xs text-blue-400" target="_blank" href="link.url">{link.url}</a>
                        </div>
                        <div className="text-center">
                            <div className="border rounded-md p-2 mt-1 md:mt-0">
                                <div className="text-3xl">
                                    {
                                        clicks
                                            .filter(
                                                c => c.uri === link.url
                                                    && isToday(c.createdAt)
                                            )
                                            .length
                                    }
                                </div>
                                <div className="text-gray-400 text-xs uppercase font-bold">clicks today</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="border rounded-md p-2 mt-1 md:mt-0">
                                <div className="text-3xl">
                                    {clicks.filter(c => c.uri === link.url).length}
                                </div>
                                <div className="text-gray-400 text-xs uppercase font-bold">clicks total</div>
                            </div>
                        </div>
                    </div>
                ))}
            </SectionBox>
        </div>
    )
} 