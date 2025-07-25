import { NextResponse } from 'next/server';
import { incrementViewCount } from '@/lib/articles';

/**
 * @swagger
 * /api/articles/{id}/view:
 *   post:
 *     summary: Increments the view count of an article.
 *     description: Finds an article by its ID and atomically increments its `view_count` by 1. This is a fire-and-forget endpoint; it will return success even if the database operation fails silently (errors are logged on the server).
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The numeric ID of the article to update.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: View count increment request was successfully received.
 *       400:
 *         description: Invalid article ID provided.
 *       500:
 *         description: Internal server error.
 */
export async function POST(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: _id } = (await params);
    if (!_id) {
        return;
    }
    const id = parseInt(_id, 10);

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 });
    }

    // We don't need to await this. Let it run in the background.
    // This is a "fire-and-forget" operation from the client's perspective.
    // The incrementViewCount function logs any potential errors on the server side.
    incrementViewCount(id);

    return NextResponse.json({ message: 'View count incremented' }, { status: 200 });
}

