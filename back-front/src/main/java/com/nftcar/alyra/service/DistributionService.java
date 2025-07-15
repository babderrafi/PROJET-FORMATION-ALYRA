package com.nftcar.alyra.service;

import com.nftcar.alyra.domain.Distribution;
import com.nftcar.alyra.repository.DistributionRepository;
import com.nftcar.alyra.service.dto.DistributionDTO;
import com.nftcar.alyra.service.mapper.DistributionMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Distribution}.
 */
@Service
@Transactional
public class DistributionService {

    private final Logger log = LoggerFactory.getLogger(DistributionService.class);

    private final DistributionRepository distributionRepository;

    private final DistributionMapper distributionMapper;

    public DistributionService(DistributionRepository distributionRepository, DistributionMapper distributionMapper) {
        this.distributionRepository = distributionRepository;
        this.distributionMapper = distributionMapper;
    }

    /**
     * Save a distribution.
     *
     * @param distributionDTO the entity to save.
     * @return the persisted entity.
     */
    public DistributionDTO save(DistributionDTO distributionDTO) {
        log.debug("Request to save Distribution : {}", distributionDTO);
        Distribution distribution = distributionMapper.toEntity(distributionDTO);
        distribution = distributionRepository.save(distribution);
        return distributionMapper.toDto(distribution);
    }

    /**
     * Partially update a distribution.
     *
     * @param distributionDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<DistributionDTO> partialUpdate(DistributionDTO distributionDTO) {
        log.debug("Request to partially update Distribution : {}", distributionDTO);

        return distributionRepository
            .findById(distributionDTO.getId())
            .map(existingDistribution -> {
                distributionMapper.partialUpdate(existingDistribution, distributionDTO);

                return existingDistribution;
            })
            .map(distributionRepository::save)
            .map(distributionMapper::toDto);
    }

    /**
     * Get all the distributions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<DistributionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Distributions");
        return distributionRepository.findAll(pageable).map(distributionMapper::toDto);
    }

    /**
     * Get one distribution by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<DistributionDTO> findOne(Long id) {
        log.debug("Request to get Distribution : {}", id);
        return distributionRepository.findById(id).map(distributionMapper::toDto);
    }

    /**
     * Delete the distribution by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Distribution : {}", id);
        distributionRepository.deleteById(id);
    }
}
