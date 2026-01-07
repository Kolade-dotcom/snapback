import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().notNull(), // References auth.users
    username: text('username').unique(),
    avatarUrl: text('avatar_url'),
    totalShameCredits: integer('total_shame_credits').default(0),
    currentStreak: integer('current_streak').default(0),
    subscriptionStatus: text('subscription_status').default('free'),
});

export const tasks = pgTable('tasks', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    title: text('title').notNull(),
    difficultyScore: integer('difficulty_score'),
    beforePhotoUrl: text('before_photo_url'),
    afterPhotoUrl: text('after_photo_url'),
    status: text('status').default('pending'), // 'pending' | 'completed' | 'deleted'
    shameCreditsEarned: integer('shame_credits_earned').default(0),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    completedAt: timestamp('completed_at'),
});

export const roasts = pgTable('roasts', {
    id: uuid('id').defaultRandom().primaryKey(),
    taskId: uuid('task_id').references(() => tasks.id).notNull(),
    personalityType: text('personality_type').notNull(), // 'basic' | 'gordon_ramsay' | 'gen_z'
    roastText: text('roast_text').notNull(),
    intensityLevel: integer('intensity_level').notNull(), // 1-10
    sentAt: timestamp('sent_at').defaultNow().notNull(),
});

export const shameCreditTransactions = pgTable('shame_credit_transactions', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').references(() => users.id).notNull(),
    amount: integer('amount').notNull(),
    transactionType: text('transaction_type').notNull(),
    source: text('source'),
    balanceAfter: integer('balance_after'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
