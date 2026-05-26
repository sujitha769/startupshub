import { RequestHandler } from 'express'
import { prisma } from '../../db'

export const addLead: RequestHandler = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      fullDescription,
      domain,
      location,
      budget,
      projectType,
      duration,
      experienceLevel,
      numberOfOpenings,
      deadline,
      skillsRequired,
      toolsTechnologies,
      eligibilityCriteria,
      portfolioRequired,
      perks,
      contactName,
      contactEmail,
      phoneNumber,
      websiteUrl,
      preferredContactMethod,
    } = req.body

    if (
      !title || !shortDescription || !fullDescription || !domain ||
      !location || !budget || !projectType || !duration ||
      !experienceLevel || !numberOfOpenings || !eligibilityCriteria ||
      portfolioRequired === undefined || !contactName || !contactEmail ||
      !phoneNumber || !preferredContactMethod
    ) {
      return res.status(400).json({ message: 'All required fields must be provided' })
    }

    const lead = await prisma.lead.create({
      data: {
        title,
        shortDescription,
        fullDescription,
        domain,
        location,
        budget,
        projectType,
        duration,
        experienceLevel,
        numberOfOpenings,
        deadline: deadline ?? null,
        skillsRequired: skillsRequired ?? [],
        toolsTechnologies: toolsTechnologies ?? [],
        eligibilityCriteria,
        portfolioRequired,
        perks: perks ?? [],
        contactName,
        contactEmail,
        phoneNumber,
        websiteUrl: websiteUrl ?? null,
        preferredContactMethod,
      },
    })

    return res.status(201).json({ message: 'Lead created successfully', data: lead })
  } catch (error) {
    console.error('Add Lead Error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}