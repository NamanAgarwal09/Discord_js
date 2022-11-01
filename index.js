// Require the necessary discord.js classes
const Discord = require('discord.js');
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = Discord;
const config = require('./config.json')

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

// When the client is ready, run this code (only once)
client.on('ready', async () => {
    console.log(`Our bot has locked in by: ${client.user.tag}`);
    const channel = client.channels.cache.get(config.ChannelId);
    channel.send({
        content: 'select your role:',
        components: [
            new ActionRowBuilder().setComponents(
                new ButtonBuilder().setCustomId('Close')
                    .setLabel('Close').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('Near')
                    .setLabel('Near').setStyle(ButtonStyle.Primary),
            )],
    });
});

//Setting different Roles for the client+
const ROLES = {
    polor: config.polor,
    Close: config.Close,
    Near: config.Near
};


client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        const role = interaction.guild.roles.cache.get(
            ROLES[interaction.customId]
        );

        //Handling Error:-
        if (!role) {
            return interaction.reply({ content: 'Role not found', ephemeral: true });
        }

        return interaction.member.roles.add(role).then(async (member) => {
            interaction.reply({
                content: await Set_Voice_Channel_Name(role, member, interaction),
                ephemeral: true,
            })
        }).catch((err) => {
            console.log(err);
            return interaction.reply({
                content: `Some thing went wrong. The ${role} is not added to you ${interaction.member}`,
                ephemeral: true,
            });
        });
    }
});


async function Set_Voice_Channel_Name(role, member, interaction) {
    const channel01 = client.channels.cache.find(channel => channel.id === config.brifingChannel)
    channel01.send(`Welcome to the brifing section ${member}`);

    const members = await interaction.guild.members.fetch()
    const membersWithRole01 = members.filter(x => x.roles.cache.has(config.Close))
    const membersWithRole02 = members.filter(x => x.roles.cache.has(config.Near))
    var Numbers_of_users = membersWithRole01.size + membersWithRole02.size;

    if (Numbers_of_users >= 0 && Numbers_of_users <= 100) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get(config.SnowsquallRole);
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === config.SnowsquallChannel)
        channel01.setName(`Snowsquall: ${Numbers_of_users}/100`);
    }
    else if (Numbers_of_users >= 101 && Numbers_of_users <= 500) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get(config.ThundersnowRole);
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === config.ThundersnowChannel)
        channel01.setName(`ThunderSnow: ${Numbers_of_users}/500`);
    }
    else if (Numbers_of_users >= 501 && Numbers_of_users <= 1000) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get(config.SnowFlurryRole);
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === config.SnowFlurryChannel)
        channel01.setName(`Snow Flurry: ${Numbers_of_users}/1000`);
    }
    else if (Numbers_of_users >= 1001 && Numbers_of_users <= 3000) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get(config.LakeEffectSnowRole);
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === config.LakeEffectSnowChannel)
        channel01.setName(`Lake-Effect Snow: ${Numbers_of_users}/3000`);
    }
    else if (Numbers_of_users >= 3001 && Numbers_of_users <= 10000) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get(config.ExtratropicalCycloneRole);
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === config.ExtratropicalCycloneChannel)
        channel01.setName(`Extratropical cyclone: ${Numbers_of_users}/10000`);
    }
    else if (Numbers_of_users >= 10001 && Numbers_of_users >= 30000) {
        const Add_Voice_Crole = interaction.guild.roles.cache.get(config.BlizzardRole);
        const Added_Voice_Crole = member.roles.add(Add_Voice_Crole)
        const channel01 = client.channels.cache.find(channel => channel.id === config.BlizzardChannel)
        channel01.setName(`Blizzard: ${Numbers_of_users}/30000`);
    }
    else {
        console.log('Error occured');
    }
    return `The ${role} is added to you ${member}`;

};

// Login to Discord with your client's token
client.login(config.token);
