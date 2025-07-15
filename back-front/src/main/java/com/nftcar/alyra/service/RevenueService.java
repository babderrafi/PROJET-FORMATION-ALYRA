package com.nftcar.alyra.service;

import com.nftcar.alyra.domain.Revenue;
import com.nftcar.alyra.repository.RevenueRepository;
import com.nftcar.alyra.service.dto.RevenueDTO;
import com.nftcar.alyra.service.mapper.RevenueMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Revenue}.
 */
@Service
@Transactional
public class RevenueService {

    private final Logger log = LoggerFactory.getLogger(RevenueService.class);

    private final RevenueRepository revenueRepository;

    private final RevenueMapper revenueMapper;

    public RevenueService(RevenueRepository revenueRepository, RevenueMapper revenueMapper) {
        this.revenueRepository = revenueRepository;
        this.revenueMapper = revenueMapper;
    }

    /**
     * Save a revenue.
     *
     * @param revenueDTO the entity to save.
     * @return the persisted entity.
     */
    public RevenueDTO save(RevenueDTO revenueDTO) {
        log.debug("Request to save Revenue : {}", revenueDTO);
        Revenue revenue = revenueMapper.toEntity(revenueDTO);
        revenue = revenueRepository.save(revenue);
        return revenueMapper.toDto(revenue);
    }

    /**
     * Partially update a revenue.
     *
     * @param revenueDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<RevenueDTO> partialUpdate(RevenueDTO revenueDTO) {
        log.debug("Request to partially update Revenue : {}", revenueDTO);

        return revenueRepository
            .findById(revenueDTO.getId())
            .map(existingRevenue -> {
                revenueMapper.partialUpdate(existingRevenue, revenueDTO);

                return existingRevenue;
            })
            .map(revenueRepository::save)
            .map(revenueMapper::toDto);
    }

    /**
     * Get all the revenues.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<RevenueDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Revenues");
        return revenueRepository.findAll(pageable).map(revenueMapper::toDto);
    }

    /**
     * Get one revenue by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<RevenueDTO> findOne(Long id) {
        log.debug("Request to get Revenue : {}", id);
        return revenueRepository.findById(id).map(revenueMapper::toDto);
    }

    /**
     * Delete the revenue by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Revenue : {}", id);
        revenueRepository.deleteById(id);
    }
}
