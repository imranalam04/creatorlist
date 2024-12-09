import { Page } from '../../models/Page';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import UsernameForm from '../../components/forms/usernameForm';
import connectToDatabase from '@/app/connect';
import PageSettingForm from '@/app/components/forms/PageSettingForm';
import PageButtonsForm from '@/app/components/forms/PageButtonsForm';
import PageLinksForm from '@/app/components/forms/PageLinksForm';
import cloneDeep from 'clone-deep'

const PageComponent = async ({ searchParams }) => {
    // Connect to the database
    await connectToDatabase();

    // Fetch session information
    const session = await getServerSession(authOptions);

    // Access desiredUsername directly as it's a plain object
    const desiredUsername = searchParams?.desiredUsername;

    // Redirect if session is not available
    if (!session) {
        redirect('/');
    }

    // Check if the user has an existing page
    const page = await Page.findOne({ owner: session?.user?.email });

    const leanPage = cloneDeep(page.toJSON());
    leanPage._id = leanPage._id.toString()

    if (page) {
        return (
            <div>
                <PageSettingForm page={leanPage} user={session.user} />
                <PageButtonsForm page={leanPage} user={session.user} />
                <PageLinksForm page={leanPage} user={session.user} />
            </div>
        );
    }

    return (
        <div>
            <UsernameForm desiredUsername={desiredUsername} />
        </div>
    );
};

export default PageComponent;
